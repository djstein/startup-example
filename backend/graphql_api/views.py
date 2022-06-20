import json
from os import environ

from django.core.serializers.json import DjangoJSONEncoder
from django.views.generic.base import TemplateView
from graphene_django.views import GraphQLView

class CustomGraphQLView(GraphQLView, TemplateView):
    template_name = "graphql_playground.html"

    endpoint = None
    subscription_endpoint = None
    workspace_name = None
    config = None
    settings = None

    def __init__(
        self,
        endpoint=None,
        subscription_endpoint=None,
        workspace_name=None,
        config=None,
        settings=None,
        **kwargs
    ):
        super().__init__(**kwargs)
        self.options = {
            "endpoint": endpoint,
            "subscriptionEndpoint": subscription_endpoint,
            "workspaceName": workspace_name,
            "config": config,
            "settings": settings,
        }

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context["options"] = json.dumps(self.options, cls=DjangoJSONEncoder)
        context["GRAPHQL_PLAYGROUND_ENDPOINT"] = environ.get(
            "GRAPHQL_PLAYGROUND_ENDPOINT", "http://localhost:8000/graphql/"
        )
        return context

    def dispatch(self, request, *args, **kwargs):
        data = self.parse_body(request)
        # show_graphiql = self.graphiql and self.can_display_graphiql(request, data)

        # if show_graphiql:
        #     return super().get(request, *args, **kwargs)
        return super().dispatch(request, *args, **kwargs)