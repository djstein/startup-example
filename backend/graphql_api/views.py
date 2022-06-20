from django.http import HttpResponsePermanentRedirect
from django.views.generic.base import TemplateView
from graphene_django.views import GraphQLView

class CustomGraphQLView(GraphQLView, TemplateView):

    def dispatch(self, request, *args, **kwargs):
        data = self.parse_body(request)
        show_graphiql = self.graphiql and self.can_display_graphiql(request, data)

        if show_graphiql:
            return HttpResponsePermanentRedirect('http://localhost:3002')
        return super().dispatch(request, *args, **kwargs)
