const { gql } = require("apollo-server");

const userType = gql`
  type User {
    id: ID!
    email: String!
    fullName: String!
    address: String
    bankDetails: BankDetails
    phoneNumber: String!
    ABN: String
  }

  type BankDetails {
    accountName: String
    accountNumber: String
    BSB: String
  }

  # Auth
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  # Root Query type
  type Query {
    me: User
  }

  # Root Mutation type
  type Mutation {
    createUser(userInput: UserInput): User!
    updateUser(update: UserUpdateInput!): User
    login(email: String!, password: String!): AuthData
    logout(token: String!): Boolean
    requestPasswordReset(email: String!): Boolean
    resetPassword(resetToken: String!, newPassword: String!): Boolean
  }

  # Input type for creating user
  input UserInput {
    email: String!
    fullName: String!
    password: String!
    address: String
    bankDetails: BankDetailsInput
    phoneNumber: String!
    ABN: String
  }

  # Input type for bank details
  input BankDetailsInput {
    accountName: String
    accountNumber: String
    BSB: String
  }

  # Input type for updating user
  input UserUpdateInput {
    email: String
    fullName: String
    address: String
    bankDetails: BankDetailsInput
    phoneNumber: String
    ABN: String
  }
`;

module.exports = userType;
