import graphene
from django.contrib.auth import get_user_model
from graphene import Field, relay

from graphql_api.utils import delete, update_or_create
from users.types import UserType


class User(relay.ClientIDMutation):
    class Input:
        id = graphene.ID()

    user = Field(UserType)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        return cls(user=update_or_create(get_user_model(), kwargs))


class UserDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.ID()

    ok = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        return cls(ok=delete(get_user_model(), kwargs))
