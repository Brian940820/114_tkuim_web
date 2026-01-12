const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Registration", registrationSchema);
