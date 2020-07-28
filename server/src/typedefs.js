const gql = require("graphql-tag");

module.exports = gql`
  directive @date(defaultFormat: String = "mmmm d, yyyy") on FIELD_DEFINITION
  directive @auth(role: Role, privilege: Privilege) on FIELD_DEFINITION

  scalar Date

  enum Theme {
    DARK
    LIGHT
  }

  enum Role {
    ADMIN
    MEMBER
    GUEST
  }

  enum Privilege {
    ADVANCED_MOVIES
  }

  type User {
    id: ID!
    email: String!
    avatar: String!
    verified: Boolean!
    createdAt: Date! @date
    posts: [Post]!
    role: Role!
    settings: Settings!
    privileges: [Privilege!]!
  }

  type AuthUser {
    token: String!
    user: User!
  }

  type Post {
    id: ID!
    message: String!
    author: User!
    createdAt: Date! @date
    likes: Int!
    views: Int!
  }

  type Settings {
    id: ID!
    user: User!
    theme: Theme!
    emailNotifications: Boolean!
    pushNotifications: Boolean!
  }

  type Item {
    task: String!
  }

  type Invite {
    email: String!
    from: User!
    createdAt: Date! @date
    role: Role!
  }

  type Movie {
    name: String!
    director: String!
    rating: Int! @auth(privilege: ADVANCED_MOVIES)
    createdAt: Date! @date
    createdBy: User!
  }

  input NewPostInput {
    message: String!
  }

  input UpdateSettingsInput {
    theme: Theme
    emailNotifications: Boolean
    pushNotifications: Boolean
  }

  input UpdateUserInput {
    email: String
    avatar: String
    verified: Boolean
  }

  input InviteInput {
    email: String!
    role: Role!
  }

  input SignupInput {
    email: String!
    password: String!
    role: Role!
    isAdvancedUser: Boolean!
  }

  input SigninInput {
    email: String!
    password: String!
  }

  input MovieInput {
    name: String!
    director: String!
    rating: Int!
  }

  type Query {
    me: User! @auth
    posts: [Post]! @auth
    post(id: ID!): Post! @auth
    userSettings: Settings! @auth
    feed: [Post]!
    movies: [Movie]! @auth
  }

  type Mutation {
    updateSettings(input: UpdateSettingsInput!): Settings! @auth
    createPost(input: NewPostInput!): Post! @auth
    updateMe(input: UpdateUserInput!): User @auth
    invite(input: InviteInput!): Invite! @auth(role: ADMIN)
    signup(input: SignupInput!): AuthUser!
    signin(input: SigninInput!): AuthUser!
    createItem(task: String!): Item!
    createMovie(input: MovieInput!): Movie!
  }

  type Subscription {
    newPost: Post! @auth
  }
`;
