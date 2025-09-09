// backend-practce/routes/product.js
import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// ➕ Product qo'shish
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Product qo'shishda xato", error: err.message });
  }
});

// 📌 Barcha productlarni olish
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Productlarni olishda xato", error: err.message });
  }
});

// ❌ Product o‘chirish
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product o‘chirildi ✅" });
  } catch (err) {
    res.status(500).json({ message: "Productni o‘chirishda xato", error: err.message });
  }
});

export default router;
