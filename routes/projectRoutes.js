const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create project
router.post("/", async (req, res) => {
  try {
    const { name, client, status, priority, startDate, endDate } = req.body;
    if (!name || !client || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const project = new Project({ name, client, status, priority, startDate, endDate });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update project
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Bulk delete projects via POST
router.post("/delete", async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return res.status(400).json({ message: "No IDs provided" });

    const result = await Project.deleteMany({ _id: { $in: ids } });
    res.json({ message: `${result.deletedCount} project(s) deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
