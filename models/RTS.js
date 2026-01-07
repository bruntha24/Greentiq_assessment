const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  date: String,
  text: String,
});

const RTSSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    details: {
      company: String,
      contact: String,
      saleDate: String,
      owner: String,
      saleType: String,
      status: String,
    },
    activities: [ActivitySchema],
    stakeholders: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("RTS", RTSSchema);
