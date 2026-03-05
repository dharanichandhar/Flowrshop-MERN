const Order = require("../models/Order");

function calcTotal(items) {
  return items.reduce((sum, it) => sum + Number(it.price) * Number(it.qty), 0);
}

async function createOrder(req, res) {
  const { items, address } = req.body;

  if (!Array.isArray(items) || items.length === 0)
    return res.status(400).json({ message: "Cart items required" });

  const required = ["mobile", "street", "city", "state", "pincode", "fullAddress"];
  for (const k of required) {
    if (!address || !address[k]) return res.status(400).json({ message: `Address field missing: ${k}` });
  }

  const order = await Order.create({
    userId: req.user._id,
    items,
    address,
    paymentMethod: "COD",
    status: "Pending"
  });

  res.status(201).json({
    order,
    total: calcTotal(items)
  });
}

async function myOrders(req, res) {
  const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
}

async function allOrders(req, res) {
  const orders = await Order.find().populate("userId", "name email role").sort({ createdAt: -1 });
  res.json(orders);
}

async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const allowed = ["Pending", "Packed", "Shipped", "Delivered", "Cancelled"];
  if (!allowed.includes(status)) return res.status(400).json({ message: "Invalid status" });

  const order = await Order.findById(id).populate("userId", "name email");
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = status;
  await order.save();

  res.json(order);
}

module.exports = { createOrder, myOrders, allOrders, updateOrderStatus };