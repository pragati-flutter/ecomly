const { Schema, model } = require("mongoose");

const categorySchema = Schema({
  name: { type: String, required: true },
  color: { type: String, default: "#000000" },
  image: { type: String, required: true },
  markForDeletion: { type: Boolean, default: false },
});

exports.Category = model("Category", categorySchema);
