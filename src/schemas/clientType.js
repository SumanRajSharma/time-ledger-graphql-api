const { gql } = require("apollo-server");

const clientType = gql`
  type CareType {
    care_title: String!
    description: String!
  }

  type Rate {
    monday: Float
    tuesday: Float
    wednesday: Float
    thursday: Float
    friday: Float
    saturday: Float
    sunday: Float
    public_holiday: Float
  }

  type Client {
    id: ID!
    user: User!
    name: String!
    address: String!
    participant_name: String!
    participant_number: String!
    care_type: [CareType!]!
    rate: Rate
  }

  type DeleteClientPayload {
    success: Boolean!
    id: ID
  }

  extend type Query {
    getClients: [Client!]!
    getClient(id: ID!): Client
  }

  extend type Mutation {
    createClient(
      name: String!
      address: String!
      participant_name: String!
      participant_number: String!
      care_type: [CareTypeInput!]!
      rate: RateInput
    ): Client

    updateClient(
      id: ID!
      name: String
      address: String
      participant_name: String
      participant_number: String
      care_type: [CareTypeInput!]
      rate: RateInput
    ): Client

    deleteClient(id: ID!): DeleteClientPayload!
  }

  input CareTypeInput {
    care_title: String!
    description: String!
  }

  input RateInput {
    monday: Float
    tuesday: Float
    wednesday: Float
    thursday: Float
    friday: Float
    saturday: Float
    sunday: Float
    public_holiday: Float
  }
`;

module.exports = clientType;
