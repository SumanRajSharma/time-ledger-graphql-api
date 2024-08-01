require("dotenv").config();
const MONGO_DB = process.env.MONGO_DB;
const JWT_SECRET = process.env.JWT_SECRET; // Added this line
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schemas");
const resolvers = require("./resolvers");
const BlacklistedToken = require("./models/BlacklistedToken");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken"); // Ensure jwt is imported

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];
    if (token) {
      const isBlacklisted = await BlacklistedToken.findOne({ token: token });
      if (isBlacklisted) {
        return { isAuth: false };
      }

      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return { isAuth: true, user: decodedToken };
      } catch (err) {
        return { isAuth: false };
      }
    }
    return { isAuth: false, user: null };
  },
});

mongoose
  .connect(MONGO_DB)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });
