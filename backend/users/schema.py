import graphene
from graphene import ObjectType, relay
from graphene_django.filter import DjangoFilterConnectionField
from users.types import UserType
from users.mutations import UserMutation, UserDelete

# signals must be imported into application runtime. do not remove this line
# pylint: disable=unused-import
# import apps.users.signals  # noqa: F401


class Query(ObjectType):
    whoami = graphene.Field(UserType)
    user = relay.Node.Field(UserType)
    users = DjangoFilterConnectionField(UserType)

    def resolve_whoami(self, info):
        if not info.context.user.is_authenticated:
            return None
        return info.context.user


class Mutation(ObjectType):
    user_mutation = UserMutation.Field()
    user_delete = UserDelete.Field()
