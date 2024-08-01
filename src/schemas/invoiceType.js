const { gql } = require("apollo-server");

const invoiceType = gql`
  type Shift {
    start: String!
    end: String!
  }

  type Day {
    amount: Float
    date: String
    hours: Float
    shifts: [Shift!]!
    is_public_holiday: Boolean
    rate: Float
  }

  type Invoice {
    id: ID!
    client: Client!
    invoiceNumber: Int!
    issueDate: String!
    dueDate: String!
    startOfWeek: String!
    days: Days
    weeklyHours: Float
    weeklyAmount: Float
    status: String!
    notes: String
  }

  type Days {
    monday: Day
    tuesday: Day
    wednesday: Day
    thursday: Day
    friday: Day
    saturday: Day
    sunday: Day
  }

  extend type Query {
    getInvoice(id: ID!): Invoice
    getInvoices: [Invoice!]!
  }

  extend type Mutation {
    createInvoice(input: CreateInvoiceInput!): Invoice
    updateInvoice(id: ID!, input: UpdateInvoiceInput!): Invoice
    updateInvoiceDay(id: ID!, dayName: String!, dayData: DayInput!): Invoice
    deleteInvoice(id: ID!): Boolean
  }

  input CreateInvoiceInput {
    client: ID!
    invoiceNumber: Int!
    issueDate: String!
    dueDate: String!
    startOfWeek: String!
    days: DaysInput!
    weeklyHours: Float
    weeklyAmount: Float
    status: String
    notes: String
  }

  input UpdateInvoiceInput {
    client: ID
    invoiceNumber: Int
    issueDate: String
    dueDate: String
    startOfWeek: String
    days: DaysInput
    weeklyHours: Float
    weeklyAmount: Float
    status: String
    notes: String
  }

  input DaysInput {
    monday: DayInput
    tuesday: DayInput
    wednesday: DayInput
    thursday: DayInput
    friday: DayInput
    saturday: DayInput
    sunday: DayInput
  }

  input DayInput {
    amount: Float
    date: String
    hours: Float
    shifts: [ShiftInput!]!
    is_public_holiday: Boolean
    rate: Float
  }

  input ShiftInput {
    start: String!
    end: String!
  }
`;

module.exports = invoiceType;
