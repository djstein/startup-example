import graphene
from users.schema import (
    Query as UsersQuery,
    Mutation as UsersMutation,
)


class Query(UsersQuery, graphene.ObjectType):
    pass


class Mutation(UsersMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
