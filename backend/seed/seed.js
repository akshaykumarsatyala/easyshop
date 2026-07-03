// Run with: npm run seed
// Adds a handful of sample products so the storefront isn't empty on first run.
// Safe to run multiple times - it only adds products, it never deletes real data.
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const User = require("../models/User");

const sampleProducts = [
  // Original PRODUCTS.json products
  {
    title: "Wireless Noise-Cancelling Headphones",
    description: "Over-ear wireless headphones with 30-hour battery life and immersive noise cancellation.",
    price: 1499,
    compareAtPrice: 2199,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    stock: 25,
  },
  {
    title: "Everyday Travel Backpack",
    description: "Water-resistant 20L backpack with a padded laptop sleeve and multiple compartments.",
    price: 899,
    compareAtPrice: 1299,
    category: "Bags",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    stock: 40,
  },
  {
    title: "Smart Fitness Band",
    description: "Tracks steps, heart rate, and sleep with a 10-day battery life.",
    price: 1299,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1575311373937-8109ee0f6a09?w=600",
    stock: 15,
  },
  {
    title: "Cotton Casual Shirt",
    description: "Breathable, 100% cotton, regular-fit shirt for everyday wear.",
    price: 599,
    compareAtPrice: 899,
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=600",
    stock: 60,
  },
  {
    title: "Ceramic Coffee Mug Set",
    description: "Set of 2 handcrafted ceramic mugs, microwave and dishwasher safe.",
    price: 349,
    category: "Home",
    imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600",
    stock: 80,
  },
  {
    title: "LED Desk Lamp",
    description: "Adjustable brightness desk lamp with a USB charging port and elegant finish.",
    price: 749,
    compareAtPrice: 999,
    category: "Home",
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
    stock: 30,
  },
  {
    title: "Running Shoes",
    description: "Lightweight cushioned sneakers built for comfort and all-day movement.",
    price: 1599,
    compareAtPrice: 2299,
    category: "Footwear",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    stock: 35,
  },
  {
    title: "Wireless Mouse",
    description: "Ergonomic wireless mouse with silent clicks and a long-lasting battery.",
    price: 699,
    compareAtPrice: 999,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600",
    stock: 50,
  },
  {
    title: "Leather Wallet",
    description: "Slim genuine leather wallet with card slots and a secure zipper pocket.",
    price: 899,
    compareAtPrice: 1299,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600",
    stock: 22,
  },
  {
    title: "Portable Blender",
    description: "Compact blender for smoothies and shakes on the go, with a rechargeable battery.",
    price: 1299,
    compareAtPrice: 1699,
    category: "Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600",
    stock: 18,
  },
  {
    title: "Apple iPhone 15",
    description: "Branded smartphone with a powerful A16 chip, camera system, and all-day battery life.",
    price: 79999,
    compareAtPrice: 89999,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    stock: 12,
  },
  {
    title: "Samsung Galaxy Watch 6",
    description: "Premium smartwatch with fitness tracking, sleep insights, and AMOLED display.",
    price: 24999,
    compareAtPrice: 29999,
    category: "Wearables",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600",
    stock: 20,
  },
  {
    title: "Sony WH-1000XM5 Headphones",
    description: "Branded over-ear headphones with industry-leading noise cancellation and rich sound.",
    price: 29999,
    compareAtPrice: 34999,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    stock: 15,
  },
  {
    title: "Dyson V12 Cordless Vacuum",
    description: "High-performance cordless vacuum with lightweight design and strong suction.",
    price: 44999,
    compareAtPrice: 49999,
    category: "Home Appliances",
    imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600",
    stock: 10,
  },
  {
    title: "JBL Flip 6 Speaker",
    description: "Portable waterproof Bluetooth speaker with bold sound and long battery life.",
    price: 12999,
    compareAtPrice: 15999,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
    stock: 25,
  },
  
  // Products from easyshop_products_1080.json
  {
    title: "Pigeon Bluetooth Speaker Standard",
    description: "High-quality Pigeon brand Bluetooth speaker with excellent sound quality and 6-month warranty.",
    price: 5360,
    compareAtPrice: 7658,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
    stock: 136,
  },
  {
    title: "Lenovo Router Standard",
    description: "Lenovo networking router with high-speed connectivity and reliable performance for your home or office.",
    price: 33103,
    compareAtPrice: 55173,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1558316374-067fb5f30001?w=600",
    stock: 44,
  },
  {
    title: "Prestige Headphones Standard",
    description: "Premium Prestige headphones with exceptional audio quality and comfort for extended use.",
    price: 46375,
    compareAtPrice: 48816,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    stock: 117,
  },
  {
    title: "LG Bluetooth Speaker Pro",
    description: "Professional-grade LG Bluetooth speaker with crystal-clear sound and long battery life.",
    price: 16455,
    compareAtPrice: 23508,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
    stock: 198,
  },
  {
    title: "Wildcraft Tablet Pro",
    description: "Wildcraft tablet with advanced features, perfect for productivity and entertainment.",
    price: 32301,
    compareAtPrice: 40377,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600",
    stock: 157,
  },
  {
    title: "Bajaj Monitor Max",
    description: "Bajaj high-performance monitor with stunning display quality for work and gaming.",
    price: 27383,
    compareAtPrice: 45639,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b8d5?w=600",
    stock: 102,
  },
  {
    title: "Xiaomi Tablet Plus",
    description: "Xiaomi tablet with 2-year warranty and excellent specifications for your needs.",
    price: 41353,
    compareAtPrice: 55138,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600",
    stock: 128,
  },
  {
    title: "Generic Smartwatch Pro",
    description: "Feature-rich smartwatch with fitness tracking and health monitoring capabilities.",
    price: 6983,
    compareAtPrice: 9977,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600",
    stock: 93,
  },
  {
    title: "HP Monitor Lite",
    description: "HP lightweight monitor perfect for everyday computing with 1-year warranty.",
    price: 11616,
    compareAtPrice: 19360,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b8d5?w=600",
    stock: 206,
  },
  {
    title: "LG Bluetooth Speaker Max",
    description: "LG maximum power Bluetooth speaker with 6-month warranty and superior audio.",
    price: 48310,
    compareAtPrice: 56836,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
    stock: 156,
  },
  {
    title: "Xiaomi Smartwatch Pro",
    description: "Xiaomi professional smartwatch with 6-month warranty and advanced features.",
    price: 37577,
    compareAtPrice: 41753,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600",
    stock: 186,
  },
  {
    title: "Noise Headphones Lite",
    description: "Affordable Noise brand headphones with quality sound and comfortable design.",
    price: 5464,
    compareAtPrice: 6429,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    stock: 30,
  },
  {
    title: "Prestige Smartwatch Lite",
    description: "Prestige lite smartwatch with 1-year warranty and essential smart features.",
    price: 9966,
    compareAtPrice: 14238,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600",
    stock: 64,
  },
  {
    title: "Wildcraft Smartphone Max",
    description: "Wildcraft maximum power smartphone with 6-month warranty and great performance.",
    price: 16632,
    compareAtPrice: 23761,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    stock: 116,
  },
  {
    title: "Syska Smartwatch Pro",
    description: "Syska professional smartwatch with 6-month warranty and fitness tracking.",
    price: 31362,
    compareAtPrice: 41816,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600",
    stock: 116,
  },
  {
    title: "Samsung Mouse Standard",
    description: "Samsung standard mouse with 6-month warranty and reliable performance.",
    price: 11396,
    compareAtPrice: 11996,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600",
    stock: 7,
  },
  {
    title: "Philips Bluetooth Speaker Standard",
    description: "Philips standard Bluetooth speaker with great bass and 50% discount.",
    price: 1388,
    compareAtPrice: 2777,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
    stock: 206,
  },
  {
    title: "Dell Power Bank Lite",
    description: "Dell power bank with 2-year warranty and excellent charging capacity.",
    price: 37486,
    compareAtPrice: 39459,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600",
    stock: 35,
  },
  {
    title: "Boat Smartphone Plus",
    description: "Boat smartphone with 2-year warranty and modern features.",
    price: 22433,
    compareAtPrice: 28042,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    stock: 3,
  },
  {
    title: "Lenovo Keyboard Pro",
    description: "Lenovo professional keyboard with ergonomic design and 50% discount.",
    price: 7034,
    compareAtPrice: 14069,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1587829191301-c959bfb63ac2?w=600",
    stock: 65,
  },
];

async function run() {
  await connectDB();

  const admin = await User.findOne({ role: "admin" });

  for (const item of sampleProducts) {
    const exists = await Product.findOne({ title: item.title });
    if (!exists) {
      await Product.create({ ...item, createdBy: admin ? admin._id : undefined });
      console.log(`Added: ${item.title}`);
    } else {
      console.log(`Skipped (already exists): ${item.title}`);
    }
  }

  console.log("Seeding complete.");
  await mongoose.connection.close();
  process.exit(0);
}

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
