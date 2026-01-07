const RTS = require("../models/RTS");

/* ================= GET ALL ================= */
exports.getAllRTS = async (req, res) => {
  try {
    const rts = await RTS.find().sort({ createdAt: -1 });
    res.json(rts);
  } catch (error) {
    res.status(500).json({ message: "Failed to load RTS" });
  }
};

/* ================= CREATE ================= */
exports.createRTS = async (req, res) => {
  try {
    const rts = await RTS.create(req.body);
    res.status(201).json(rts);
  } catch (error) {
    res.status(400).json({ message: "Failed to create RTS" });
  }
};

/* ================= UPDATE ================= */
exports.updateRTS = async (req, res) => {
  try {
    const updated = await RTS.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update RTS" });
  }
};

/* ================= DELETE ================= */
exports.deleteRTS = async (req, res) => {
  try {
    await RTS.findByIdAndDelete(req.params.id);
    res.json({ message: "RTS deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete RTS" });
  }
};
