import graphene
from graphene import relay
from graphene_django import DjangoObjectType

from authentication.models import Token


class TokenType(DjangoObjectType):
    pk = graphene.Field(type_=graphene.String, source="pk")

    class Meta:
        model = Token
        interfaces = (relay.Node,)
        filter_fields = []
