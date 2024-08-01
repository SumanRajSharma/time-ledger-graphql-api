const clientResolvers = require("./clientResolvers");
const invoiceResolver = require("./invoiceResolvers");
const userResolvers = require("./userResolvers");
// Import other resolvers...

const resolvers = [
  userResolvers,
  clientResolvers,
  invoiceResolver /*, other resolvers... */,
];

module.exports = resolvers;
