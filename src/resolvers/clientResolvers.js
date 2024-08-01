const Client = require("../models/Client");
const User = require("../models/User");

const clientResolvers = {
  Query: {
    // Fetch all clients associated with the logged-in user
    getClients: async (_, args, context) => {
      if (!context.isAuth) {
        throw new Error("Not authenticated");
      }

      return await Client.find({ user: context.user.userId });
    },

    // Fetch a single client by ID, ensuring it belongs to the logged-in user
    getClient: async (_, { id }, context) => {
      if (!context.isAuth) {
        throw new Error("Not authenticated");
      }

      const client = await Client.findById(id);
      if (!client || client.user.toString() !== context.user.userId) {
        throw new Error("Client not found or you do not have access to it");
      }
      return client;
    },
  },

  Mutation: {
    // Create a new client associated with the logged-in user
    createClient: async (
      _,
      { name, address, participant_name, participant_number, care_type, rate },
      context
    ) => {
      console.log(context.isAuth);
      if (!context.isAuth) {
        throw new Error("Not authenticated");
      }

      const newClient = new Client({
        user: context.user.userId,
        name,
        address,
        participant_name,
        participant_number,
        care_type,
        rate,
      });

      // Optionally, link the client to the user model if you maintain a client list there
      await User.findByIdAndUpdate(context.user.userId, {
        $push: { clients: newClient._id },
      });

      // Populate user to ensure all fields, especially the ID, are correctly formatted.
      // Assuming `user` is a field in the Client model referencing the User model.
      await newClient.populate("user");

      // Convert the MongoDB ObjectID to a string. This step may be redundant if you're using Mongoose virtuals to handle ID conversion.
      newClient.user.id = newClient.user.id.toString();

      return newClient.save();
    },

    // Update a client ensuring it belongs to the logged-in user
    updateClient: async (
      _,
      {
        id,
        name,
        address,
        participant_name,
        participant_number,
        care_type,
        rate,
      },
      context
    ) => {
      if (!context.isAuth) {
        throw new Error("Not authenticated");
      }

      const client = await Client.findById(id);
      if (!client || client.user.toString() !== context.user.userId) {
        throw new Error("Client not found or you do not have access to it");
      }

      // Update fields if provided
      if (name) client.name = name;
      if (address) client.address = address;
      if (participant_name) client.participant_name = participant_name;
      if (participant_number) client.participant_number = participant_number;
      if (care_type) client.care_type = care_type;
      if (rate) client.rate = rate;

      return await client.save();
    },

    // Delete a client ensuring it belongs to the logged-in user
    deleteClient: async (_, { id }, context) => {
      if (!context.isAuth) {
        throw new Error("Not authenticated");
      }

      const client = await Client.findById(id);
      if (!client || client.user.toString() !== context.user.userId) {
        throw new Error("Client not found or you do not have access to it");
      }

      await Client.deleteOne({ _id: id });

      // Remove the client reference from the User document
      await User.findByIdAndUpdate(context.user.userId, {
        $pull: { clients: client._id },
      });

      return { success: true, id: client._id };
    },
  },
};

module.exports = clientResolvers;
