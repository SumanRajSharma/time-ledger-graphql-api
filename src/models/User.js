const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },
    bankDetails: {
      accountName: {
        type: String,
        required: false,
      },
      accountNumber: {
        type: String,
        required: false,
      },
      BSB: {
        type: String,
        required: false,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    ABN: {
      type: String,
      required: false,
    },
    clients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Client",
      },
    ],
  },
  { timestamps: true }
);

// Pre-save hook to hash password before saving
userSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 12);
  }
  next();
});
// Create a model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
