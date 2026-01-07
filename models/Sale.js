const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  saleName: { type: String, required: true },
  status: { type: String, enum: ["Open", "Lost", "Sold", "Stalled"], default: "Open" },
  saleDate: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  stage: { type: String, default: "" },
  nextActivity: { type: Date },
});

module.exports = mongoose.models.Sale || mongoose.model("Sale", SaleSchema);
