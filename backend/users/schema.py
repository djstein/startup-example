import graphene
from graphene import ObjectType, relay
from graphene_django.filter import DjangoFilterConnectionField

from users.mutations import User, UserDelete
from users.types import UserType


class Query(ObjectType):
    whoami = graphene.Field(UserType)
    user = relay.Node.Field(UserType)
    users = DjangoFilterConnectionField(UserType)

    def resolve_whoami(self, info):
        if not info.context.user.is_authenticated:
            return None
        return info.context.user


class Mutation(ObjectType):
    user = User.Field()
    user_delete = UserDelete.Field()
