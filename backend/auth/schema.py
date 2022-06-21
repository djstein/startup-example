from graphene import ObjectType

from users.mutations import (
    DeleteToken,
    Login,
    Logout,
    RefreshToken,
    Signup,
    ValidateToken,
)


class Mutation(ObjectType):
    signup = Signup.Field()
    login = Login.Field()
    logout = Logout.Field()
    validate_token = ValidateToken.Field()
    refresh_token = RefreshToken.Field()
    delete_token = DeleteToken.Field()
