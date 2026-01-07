const Request = require("../models/Request"); // Mongo model

// Get all requests
exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find({});
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};

// Create new request
exports.createRequest = async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: "Failed to create request" });
  }
};

// Update request
exports.updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRequest = await Request.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedRequest) return res.status(404).json({ error: "Request not found" });
    res.json(updatedRequest);
  } catch (err) {
    res.status(500).json({ error: "Failed to update request" });
  }
};

// Delete request
exports.deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Request.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Request not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete request" });
  }
};
