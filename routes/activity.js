const express = require("express");
const router = express.Router();
const controller = require("../controllers/activityController");

router.get("/", controller.getActivities);
router.post("/", controller.createActivity);
router.put("/:id", controller.updateActivity);

// ✅ Bulk delete route via POST
router.post("/delete", controller.deleteActivities);

module.exports = router;
