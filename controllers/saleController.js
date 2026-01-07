const Sale = require("../models/Sale");

// GET all sales
exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// POST add sale
exports.addSale = async (req, res) => {
  try {
    const sale = new Sale(req.body);
    const saved = await sale.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
};

// PUT update sale
exports.editSale = async (req, res) => {
  try {
    const updated = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Sale not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
};

// DELETE sales (multiple)
exports.deleteSales = async (req, res) => {
  try {
    const { ids } = req.body; // expects { ids: [] }
    await Sale.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Delete failed", error });
  }
};
