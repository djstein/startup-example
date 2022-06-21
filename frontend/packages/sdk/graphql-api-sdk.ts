import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import { useFetchData } from "./Fetcher";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
};

export type DeleteTokenInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  key?: InputMaybe<Scalars["ID"]>;
};

export type DeleteTokenPayload = {
  __typename?: "DeleteTokenPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type LoginInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type LoginPayload = {
  __typename?: "LoginPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  token?: Maybe<TokenType>;
};

export type LogoutInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
};

export type LogoutPayload = {
  __typename?: "LogoutPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  deleteToken?: Maybe<DeleteTokenPayload>;
  login?: Maybe<LoginPayload>;
  logout?: Maybe<LogoutPayload>;
  signup?: Maybe<SignupPayload>;
  user?: Maybe<UserPayload>;
  userDelete?: Maybe<UserDeletePayload>;
};

export type MutationDeleteTokenArgs = {
  input: DeleteTokenInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationLogoutArgs = {
  input: LogoutInput;
};

export type MutationSignupArgs = {
  input: SignupInput;
};

export type MutationUserArgs = {
  input: UserInput;
};

export type MutationUserDeleteArgs = {
  input: UserDeleteInput;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object */
  id: Scalars["ID"];
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: "PageInfo";
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["String"]>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  token?: Maybe<TokenType>;
  tokens?: Maybe<TokenType>;
  user?: Maybe<UserType>;
  users?: Maybe<UserTypeConnection>;
  whoami?: Maybe<UserType>;
};

export type QueryTokensArgs = {
  id: Scalars["ID"];
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type SignupInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
};

export type SignupPayload = {
  __typename?: "SignupPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  token?: Maybe<TokenType>;
};

export type TokenType = Node & {
  __typename?: "TokenType";
  createdAt: Scalars["DateTime"];
  /** The ID of the object */
  id: Scalars["ID"];
  key: Scalars["String"];
  keyName: Scalars["String"];
  pk?: Maybe<Scalars["String"]>;
  user: UserType;
};

export type TokenTypeConnection = {
  __typename?: "TokenTypeConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TokenTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `TokenType` and its cursor. */
export type TokenTypeEdge = {
  __typename?: "TokenTypeEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<TokenType>;
};

export type UserDeleteInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
};

export type UserDeletePayload = {
  __typename?: "UserDeletePayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  ok?: Maybe<Scalars["Boolean"]>;
};

export type UserInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
};

export type UserPayload = {
  __typename?: "UserPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  user?: Maybe<UserType>;
};

export type UserType = Node & {
  __typename?: "UserType";
  authToken: TokenTypeConnection;
  dateJoined: Scalars["DateTime"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  /** The ID of the object */
  id: Scalars["ID"];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars["Boolean"];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars["Boolean"];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars["Boolean"];
  lastLogin?: Maybe<Scalars["DateTime"]>;
  lastName: Scalars["String"];
  password: Scalars["String"];
  pk?: Maybe<Scalars["String"]>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"];
};

export type UserTypeAuthTokenArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type UserTypeConnection = {
  __typename?: "UserTypeConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserTypeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `UserType` and its cursor. */
export type UserTypeEdge = {
  __typename?: "UserTypeEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<UserType>;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login?: {
    __typename?: "LoginPayload";
    token?: {
      __typename?: "TokenType";
      id: string;
      key: string;
      keyName: string;
      createdAt: any;
      user: { __typename?: "UserType"; username: string };
    } | null;
  } | null;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
  __typename?: "Query";
  users?: {
    __typename?: "UserTypeConnection";
    edges: Array<{
      __typename?: "UserTypeEdge";
      node?: { __typename?: "UserType"; id: string } | null;
    } | null>;
  } | null;
};

export const LoginDocument = `
    mutation login($input: LoginInput!) {
  login(input: $input) {
    token {
      id
      user {
        username
      }
      key
      keyName
      createdAt
    }
  }
}
    `;
export const useLoginMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    LoginMutation,
    TError,
    LoginMutationVariables,
    TContext
  >
) =>
  useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
    ["login"],
    (variables?: LoginMutationVariables) =>
      useFetchData<LoginMutation, LoginMutationVariables>(
        LoginDocument,
        variables
      )(),
    options
  );
export const UsersDocument = `
    query users {
  users {
    edges {
      node {
        id
      }
    }
  }
}
    `;
export const useUsersQuery = <TData = UsersQuery, TError = unknown>(
  variables?: UsersQueryVariables,
  options?: UseQueryOptions<UsersQuery, TError, TData>
) =>
  useQuery<UsersQuery, TError, TData>(
    variables === undefined ? ["users"] : ["users", variables],
    useFetchData<UsersQuery, UsersQueryVariables>(UsersDocument, variables),
    options
  );
