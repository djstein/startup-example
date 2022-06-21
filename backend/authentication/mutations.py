import graphene
from django.contrib.auth import authenticate, get_user_model, login
from graphene import Field, relay

from authentication.models import Token
from authentication.types import TokenType
from graphql_api.utils import delete

User = get_user_model()

class DeleteToken(relay.ClientIDMutation):
    class Input:
        key = graphene.ID()

    ok = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        ok = bool(delete(Token, kwargs))
        return cls(ok=ok)

class Login(relay.ClientIDMutation):
    class Input:
        username = graphene.String()
        password = graphene.String()

    token = Field(TokenType)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        request = info.context
        username = kwargs.get('username')
        password = kwargs.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            token, _created = Token.objects.get_or_create(user=user, key_name="default")
        return cls(token=token)


class Logout(relay.ClientIDMutation):
    ok = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        logout_status = True
        return cls(ok=logout_status)


class Signup(relay.ClientIDMutation):
    class Input:
        email = graphene.String()
        password = graphene.String()

    token = Field(TokenType)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        token = None
        return cls(token=token)
