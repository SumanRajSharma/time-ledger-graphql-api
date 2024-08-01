const mongoose = require("mongoose");

const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    required: true,
    default: Date.now,
    index: { expires: "1d" },
  },
});

module.exports = mongoose.model("BlacklistedToken", blacklistedTokenSchema);
