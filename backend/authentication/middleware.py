from datetime import datetime, timedelta
from json import loads

from django.conf import settings
from django.contrib.auth import login
from django.forms import ValidationError

from authentication.models import Token

HTTP_HEADER_ENCODING = 'iso-8859-1'


def get_authorization_header(request):
    """
    Return request's 'Authorization:' header, as a bytestring.

    Hide some test client ickyness where the header can be unicode.
    """
    auth = request.META.get('HTTP_AUTHORIZATION', b'')
    if isinstance(auth, str):
        # Work around django test client oddness
        auth = auth.encode(HTTP_HEADER_ENCODING)
    return auth


class TokenAuthenticationMiddleware:
    """
    Simple token based authentication.

    Clients should authenticate by passing the token key in the "Authorization"
    HTTP header, prepended with the string "Token ".  For example:

        Authorization: Token 401f7ac837da42b97f613d789819ff93537bee6a
    """

    keyword = 'Token'

    """
    A custom token model may be used, but must have the following properties.

    * key -- The string identifying the token
    * user -- The user to which the token belongs
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            response = self.get_response(request)
            return response
        
        if request.path in settings.PASSTHROUGH_URLS:
            response = self.get_response(request)
            return response

        auth = get_authorization_header(request).split()

        if not auth or auth[0].lower() != self.keyword.lower().encode():
            raise ValidationError('No token provided.')

        if len(auth) == 1:
            raise ValidationError('Invalid token header. No credentials provided.')
 
        elif len(auth) > 2:
            raise ValidationError('Invalid token header. Token string should not contain spaces.')

        try:
            token = auth[1].decode()
        except UnicodeError:
            raise ValidationError('Invalid token header. Token string should not contain invalid characters.')

        user, token = self.authenticate_credentials(token)
        if user is not None:
            login(request, user)
            response = self.get_response(request)
        return response

    def authenticate_credentials(self, key):
        try:
            token = Token.objects.select_related('user').get(key=key)
        except Token.DoesNotExist:
            raise ValidationError('Invalid token.')

        if not token.user.is_active:
            raise ValidationError('User inactive or deleted.')

        return (token.user, token)

class LoginAddTokenToCookiesMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        # if the request is:
        # - the user was logged in via the authentication backend
        # - the response was successful
        # - coming in from the GraphQL path
        if request.user.is_authenticated and response.status_code == 200 and request.path == '/graphql/' and 'login' in request.body.decode():
            token_key = loads(response.content.decode()).get('data', {}).get('login', {}).get('token', {}).get('key', {})
            if token_key:
                expires = datetime.now() + timedelta(days=1)
                response.set_cookie(
                    'auth-token', value=token_key, expires=expires, path='/', domain="localhost:3003", secure=False, httponly=True, samesite=None
                )
        return response
