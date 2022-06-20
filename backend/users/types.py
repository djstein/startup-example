from django.contrib.auth import get_user_model
from graphene import relay
from graphene_django import DjangoObjectType
import graphene

class UserType(DjangoObjectType):
    pk = graphene.Field(type_=graphene.String, source="pk")

    class Meta:
        model = get_user_model()
        interfaces = (relay.Node,)
        filter_fields = []