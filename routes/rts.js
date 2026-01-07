const express = require("express");
const router = express.Router();

const {
  getAllRTS,
  createRTS,
  updateRTS,
  deleteRTS,
} = require("../controllers/rtsController");

/* ================= RTS ROUTES ================= */

// GET all RTS
router.get("/", getAllRTS);

// CREATE RTS
router.post("/", createRTS);

// UPDATE RTS
router.put("/:id", updateRTS);

// DELETE RTS
router.delete("/:id", deleteRTS);

module.exports = router;
