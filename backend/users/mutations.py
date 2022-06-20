import graphene
from graphene import Field, relay
from users.types import UserType
from graphql_api.utils import update_or_create, delete
from django.contrib.auth import get_user_model

User = get_user_model()

class UserMutation(relay.ClientIDMutation):
    class Input:
        id = graphene.ID()

    user = Field(UserType)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        return cls(user=update_or_create(User, kwargs))


class UserDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.ID()

    ok = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        return cls(ok=delete(User, kwargs))