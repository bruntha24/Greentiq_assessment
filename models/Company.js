const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  postal: String,
  country: String,
  phone: String,
  webaddress: String,
  email: String,
  category: String,
  code: String,
  number: String,
  vatNo: String,
  business: String,
});

module.exports = mongoose.model("Company", CompanySchema);
