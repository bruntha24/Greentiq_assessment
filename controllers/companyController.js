const Company = require("../models/Company");

// Get all companies
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({});
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch companies" });
  }
};

// Create company
exports.createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ error: "Failed to create company" });
  }
};

// Update company
exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCompany)
      return res.status(404).json({ error: "Company not found" });
    res.json(updatedCompany);
  } catch (err) {
    res.status(500).json({ error: "Failed to update company" });
  }
};

// Delete company
exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Company.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ error: "Company not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete company" });
  }
};
