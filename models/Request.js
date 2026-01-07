const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ["Open", "In Progress", "Closed"], default: "Open" },
  createdDate: { type: String, required: true },
  priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
});

module.exports = mongoose.model("Request", requestSchema);
