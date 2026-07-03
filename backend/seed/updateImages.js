// Run with: node updateImages.js
// Updates all product images with proper category-based URLs
require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const connectDB = require("../config/db");
const Product = require("../models/Product");

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

// Get image URL based on category and a hash of the product title
function getImageUrl(category, title) {
  const images = categoryImages[category] || categoryImages["Electronics"];
  // Use title hash to ensure same product always gets same image
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    const char = title.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return images[Math.abs(hash) % images.length];
}

async function run() {
  try {
    await connectDB();

    const products = await Product.find({});
    console.log(`Updating ${products.length} products with proper images...`);

    let updatedCount = 0;

    for (const product of products) {
      const newImageUrl = getImageUrl(product.category, product.title);
      if (product.imageUrl !== newImageUrl) {
        product.imageUrl = newImageUrl;
        await product.save();
        updatedCount++;
        if (updatedCount % 100 === 0) {
          console.log(`✓ Updated ${updatedCount} products...`);
        }
      }
    }

    console.log(`\n✅ Update complete!`);
    console.log(`   Updated: ${updatedCount} products`);
    console.log(`   Total products: ${products.length}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Update failed:", err);
    process.exit(1);
  }
}

run();
