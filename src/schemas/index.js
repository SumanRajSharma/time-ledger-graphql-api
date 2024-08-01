const { gql } = require("apollo-server");
const userType = require("./userType");
const clientType = require("./clientType");
const invoiceType = require("./invoiceType");
// Import other type definitions...

const typeDefs = [
  userType,
  clientType,
  invoiceType /*, other type definitions... */,
];

module.exports = typeDefs;
