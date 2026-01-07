const Activity = require("../models/Activity");

// Get all activities
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create activity
exports.createActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update activity
exports.updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!activity) return res.status(404).json({ message: "Activity not found" });
    res.json(activity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Bulk delete activities
exports.deleteActivities = async (req, res) => {
  try {
    const { ids } = req.body; // now read from POST body
    if (!ids || !ids.length) return res.status(400).json({ message: "No IDs provided" });

    const result = await Activity.deleteMany({ _id: { $in: ids } });
    res.json({ message: `${result.deletedCount} activity(s) deleted` });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: err.message });
  }
};
