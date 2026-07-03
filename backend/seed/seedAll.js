// Run with: npm run seed:all
// Imports all 1080 products from easyshop_products_1080.json
require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const User = require("../models/User");

// Map categories to diverse Unsplash image URLs
const categoryImages = {
  "Electronics": [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600", // Headphones
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600", // Mouse
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600", // Speaker
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600", // Phone
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600", // Tablet
  ],
  "Wearables": [
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600", // Watch
    "https://images.unsplash.com/photo-1575311373937-8109ee0f6a09?w=600", // Fitness Band
  ],
  "Home Appliances": [
    "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600", // Vacuum
  ],
  "Clothing": [
    "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=600", // Shirt
  ],
  "Footwear": [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600", // Shoes
  ],
  "Home": [
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600", // Lamp
    "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600", // Mug
  ],
  "Kitchen": [
    "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600", // Blender
  ],
  "Accessories": [
    "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600", // Wallet
  ],
  "Bags": [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600", // Backpack
  ],
};

// Get image URL based on category and product ID for variety
function getImageUrl(category, productId) {
  const images = categoryImages[category] || categoryImages["Electronics"];
  return images[(productId - 1) % images.length];
}

async function run() {
  try {
    await connectDB();

    // Read the products JSON file
    const filePath = path.join(__dirname, "../../easyshop_products_1080.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    const productsData = JSON.parse(rawData);

    const admin = await User.findOne({ role: "admin" });

    let addedCount = 0;
    let skippedCount = 0;

    for (const item of productsData) {
      // Transform the data from easyshop format to Product schema
      const productData = {
        title: item.name || item.title,
        description: `${item.brand} ${item.category} - ${item.warranty ? `${item.warranty} Warranty` : "No Warranty"}. Delivery: ${item.delivery || "Standard"}. Rating: ${item.rating}/5 (${item.reviews} reviews)`,
        price: item.finalPrice || item.price,
        compareAtPrice: item.price,
        category: item.category,
        imageUrl: getImageUrl(item.category, item.id),
        stock: item.stock,
        createdBy: admin ? admin._id : undefined,
      };

      // Check if product already exists by title
      const exists = await Product.findOne({ title: productData.title });
      
      if (!exists) {
        await Product.create(productData);
        addedCount++;
        if (addedCount % 100 === 0) {
          console.log(`✓ Added ${addedCount} products...`);
        }
      } else {
        skippedCount++;
      }
    }

    console.log(`\n✅ Seeding complete!`);
    console.log(`   Added: ${addedCount} new products`);
    console.log(`   Skipped: ${skippedCount} existing products`);
    console.log(`   Total in database: ${await Product.countDocuments()}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

run();

