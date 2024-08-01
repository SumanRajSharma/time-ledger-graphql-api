const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    participant_name: {
      type: String,
      required: true,
    },
    participant_number: {
      type: String,
      required: true,
    },
    care_type: [
      {
        care_title: String,
        description: String,
      },
    ],
    rate: {
      monday: Number,
      tuesday: Number,
      wednesday: Number,
      thursday: Number,
      friday: Number,
      saturday: Number,
      sunday: Number,
      public_holiday: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
