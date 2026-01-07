const express = require("express");
const router = express.Router();
const { getSales, addSale, editSale, deleteSales } = require("../controllers/saleController");

router.get("/", getSales);
router.post("/", addSale);
router.put("/:id", editSale);
router.delete("/", deleteSales);

module.exports = router;
