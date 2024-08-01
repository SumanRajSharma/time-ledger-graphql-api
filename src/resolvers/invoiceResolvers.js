const Invoice = require("../models/Invoice");

const invoiceResolver = {
  Query: {
    getInvoice: async (_, { id }, context) => {
      if (!context.isAuth) {
        throw new Error("Not authenticated");
      }
      try {
        const invoice = await Invoice.findById(id).populate("client");
        if (!invoice) {
          throw new Error(`Invoice with ID ${id} not found.`);
        }
        return invoice;
      } catch (error) {
        throw new Error("Error fetching invoice: " + error.message);
      }
    },
    getInvoices: async (_, args, context) => {
      if (!context.isAuth) {
        throw new Error("Not authenticated");
      }
      try {
        return await Invoice.find().populate("client");
      } catch (error) {
        throw new Error("Error fetching invoices: " + error.message);
      }
    },
  },
  Mutation: {
    createInvoice: async (_, { input }, context) => {
      if (!context.isAuth) {
        throw new Error("Not authenticated");
      }
      try {
        const newInvoice = new Invoice(input);

        // Assuming `user` is a field in the Invoice model referencing the Client model.
        await newInvoice.populate("client");

        // Convert the MongoDB ObjectID to a string. This step may be redundant if you're using Mongoose virtuals to handle ID conversion.
        newInvoice.client.id = newInvoice.client.id.toString();

        return newInvoice.save();
      } catch (error) {
        throw new Error("Error creating invoice: " + error.message);
      }
    },
    updateInvoice: async (_, { id, input }, context) => {
      if (!context.isAuth) {
        throw new Error("Not authenticated");
      }
      try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(id, input, {
          new: true,
        });
        if (!updatedInvoice) {
          throw new Error(`Invoice with ID ${id} not found.`);
        }
        return updatedInvoice;
      } catch (error) {
        throw new Error("Error updating invoice: " + error.message);
      }
    },
    updateInvoiceDay: async (_, { id, dayName, dayData }, context) => {
      if (!context.isAuth) {
        throw new Error("Not authenticated");
      }
      try {
        // Construct the update path dynamically
        const updatePath = `days.${dayName}`;

        // Perform the update operation
        const updatedInvoice = await Invoice.findByIdAndUpdate(
          id,
          { $set: { [updatePath]: dayData } },
          { new: true }
        ).populate("client"); // Assuming you want to populate the client field in the response

        // Check if the invoice was successfully updated
        if (!updatedInvoice) {
          throw new Error("Invoice not found or failed to update");
        }

        return updatedInvoice;
      } catch (error) {
        // Log the error and throw a new error to be caught by the GraphQL server
        console.error(error);
        throw new Error("Error updating invoice day");
      }
    },

    deleteInvoice: async (_, { id }, context) => {
      if (!context.isAuth) {
        throw new Error("Not authenticated");
      }
      try {
        const invoice = await Invoice.findById(id);
        if (!invoice) {
          throw new Error(`Invoice with ID ${id} not found.`);
        }
        await invoice.remove();
        return true;
      } catch (error) {
        throw new Error("Error deleting invoice: " + error.message);
      }
    },
  },
};

module.exports = invoiceResolver;
