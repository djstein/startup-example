import graphene

from authentication.schema import Mutation as AuthenticationMutation
from authentication.schema import Query as AuthenticationQuery
from users.schema import Mutation as UsersMutation
from users.schema import Query as UsersQuery


class Query(AuthenticationQuery, UsersQuery, graphene.ObjectType):
    pass


class Mutation(AuthenticationMutation, UsersMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
