from graphene import Field, ObjectType, relay

from authentication.mutations import DeleteToken, Login, Logout, Signup
from authentication.types import TokenType


class Query(ObjectType):
    token = Field(TokenType)
    tokens = relay.Node.Field(TokenType)

class Mutation(ObjectType):
    signup = Signup.Field()
    login = Login.Field()
    logout = Logout.Field()
    delete_token = DeleteToken.Field()
