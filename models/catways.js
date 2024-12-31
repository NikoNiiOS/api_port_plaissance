const mongoose = require("mongoose");

const catwaySchema = mongoose.Schema({
  _id: { type: Number, required: true },
  catwayNumber: { type: Number, required: true },
  type: {
    type: String,
    enum: ["short", "long"],
    required: true,
  },
  catwayState: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model("Catway", catwaySchema);
