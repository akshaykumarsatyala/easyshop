const express = require("express");
const Product = require("../models/Product");
const { protect, adminOnly } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// ---------- PUBLIC ROUTES (storefront) ----------

// @route GET /api/products
// @desc  List products, with optional search/filter/sort/pagination
//        ?search=shoes&category=Footwear&minPrice=100&maxPrice=999&sort=price_asc&page=1&limit=12
router.get("/", async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;

    const query = { isActive: true };

    if (search) {
      query.$text = { $search: search };
    }
    if (category) {
      query.category = category;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };
    if (sort === "newest") sortOption = { createdAt: -1 };
    if (sort === "popular") sortOption = { rating: -1, reviews: -1 };

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(500, Math.max(1, Number(limit)));

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortOption)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Product.countDocuments(query),
    ]);

    res.json({
      products,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch products", error: err.message });
  }
});

// @route GET /api/products/categories
// @desc  Distinct category list, for filter dropdowns
router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category", { isActive: true });
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch categories", error: err.message });
  }
});

// @route GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ product });
  } catch (err) {
    res.status(404).json({ message: "Product not found" });
  }
});

// ---------- ADMIN ROUTES (product management) ----------

// @route GET /api/products/admin/all
// @desc  Admin: list every product, active or not
router.get("/admin/all", protect, adminOnly, async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch products", error: err.message });
  }
});

// @route POST /api/products/upload-image
// @desc  Admin: upload a product image, get back a URL to use when creating/updating a product
router.post("/upload-image", protect, adminOnly, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file was uploaded" });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ imageUrl });
});

// @route POST /api/products
// @desc  Admin: create a product (with price, image URL, stock, category)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { title, description, price, compareAtPrice, category, imageUrl, stock } = req.body;

    if (!title || price === undefined || !imageUrl) {
      return res.status(400).json({ message: "title, price and imageUrl are required" });
    }

    const product = await Product.create({
      title,
      description,
      price,
      compareAtPrice: compareAtPrice || null,
      category,
      imageUrl,
      stock: stock ?? 0,
      createdBy: req.user._id,
    });

    res.status(201).json({ product });
  } catch (err) {
    res.status(500).json({ message: "Could not create product", error: err.message });
  }
});

// @route PUT /api/products/:id
// @desc  Admin: update a product (e.g. change price, stock, or swap the image)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const fields = ["title", "description", "price", "compareAtPrice", "category", "imageUrl", "stock", "isActive"];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) product[field] = req.body[field];
    });

    await product.save();
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: "Could not update product", error: err.message });
  }
});

// @route DELETE /api/products/:id
// @desc  Admin: permanently delete a product
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete product", error: err.message });
  }
});

module.exports = router;
