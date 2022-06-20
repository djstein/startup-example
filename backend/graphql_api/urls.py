from django.urls import path
from graphql_api.views import CustomGraphQLView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path(
        "graphql/",
        csrf_exempt(CustomGraphQLView.as_view(graphiql=True)),
        name="graphql",
    ),
]