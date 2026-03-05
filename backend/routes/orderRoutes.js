const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");
const { createOrder, myOrders, allOrders, updateOrderStatus } = require("../controllers/orderController");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, myOrders);

// admin
router.get("/", protect, isAdmin, allOrders);
router.put("/:id/status", protect, isAdmin, updateOrderStatus);

module.exports = router;