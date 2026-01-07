const Project = require("../models/Project");

// GET all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE a project
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE a project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE projects (multiple)
exports.deleteProjects = async (req, res) => {
  try {
    const { ids } = req.body;
    await Project.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Projects deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
