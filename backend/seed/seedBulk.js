/**
 * BULK SEED SCRIPT — EasyShop
 * ============================
 * Loads 1,040 products from products-1000.json into MongoDB.
 * Safe to run multiple times — skips duplicates by title.
 *
 * Usage:  npm run seed:bulk   (from backend/)
 */

require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const User = require("../models/User");

async function run() {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Resolve path — products-1000.json lives two levels up at the project root
    const filePath = path.join(__dirname, "../../products-1000.json");

    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      console.error("   Make sure products-1000.json is in the easyshop/ root folder.");
      process.exit(1);
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);

    // products-1000.json wraps the array under a "products" key
    const products = Array.isArray(parsed) ? parsed : parsed.products;

    if (!products || products.length === 0) {
      console.error("❌ No products found in products-1000.json");
      process.exit(1);
    }

    console.log(`📦 Loaded ${products.length} products from JSON`);

    const admin = await User.findOne({ role: "admin" });

    let added = 0;
    let skipped = 0;

    for (const item of products) {
      // Map JSON fields → Product schema
      const data = {
        title: item.title || item.name,
        description: item.description || "",
        price: Number(item.price) || 0,
        compareAtPrice: item.compareAtPrice ? Number(item.compareAtPrice) : null,
        category: item.category || "General",
        imageUrl: item.imageUrl || item.image || "",
        stock: Number(item.stock) ?? 100,
        rating: Number(item.rating) || 4.0,
        reviews: Number(item.reviews) || 0,
        isActive: true,
        createdBy: admin ? admin._id : undefined,
      };

      // Skip items without a valid imageUrl or title
      if (!data.title || !data.imageUrl) {
        skipped++;
        continue;
      }

      const exists = await Product.findOne({ title: data.title });
      if (exists) {
        skipped++;
      } else {
        await Product.create(data);
        added++;
        if (added % 100 === 0) {
          console.log(`  ✓ Inserted ${added} products so far...`);
        }
      }
    }

    const total = await Product.countDocuments();
    console.log("\n🎉 Bulk seeding complete!");
    console.log(`   Added  : ${added} new products`);
    console.log(`   Skipped: ${skipped} (duplicates or incomplete)`);
    console.log(`   Total in DB: ${total}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

run();
