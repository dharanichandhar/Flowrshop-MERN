const Product = require("../models/Product");

async function listProducts(req, res) {
  const { category } = req.query;
  const filter = category ? { category } : {};
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
}

async function createProduct(req, res) {
  const { title, price, imageUrl, category, stock } = req.body;
  if (!title || price === undefined || !imageUrl || !category) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const p = await Product.create({
    title,
    price,
    imageUrl,
    category,
    stock: stock ?? 50
  });
  res.status(201).json(p);
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const p = await Product.findById(id);
  if (!p) return res.status(404).json({ message: "Product not found" });

  const { title, price, imageUrl, category, stock } = req.body;

  p.title = title ?? p.title;
  p.price = price ?? p.price;
  p.imageUrl = imageUrl ?? p.imageUrl;
  p.category = category ?? p.category;
  p.stock = stock ?? p.stock;

  await p.save();
  res.json(p);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const p = await Product.findById(id);
  if (!p) return res.status(404).json({ message: "Product not found" });

  await p.deleteOne();
  res.json({ message: "Deleted" });
}

module.exports = { listProducts, createProduct, updateProduct, deleteProduct };