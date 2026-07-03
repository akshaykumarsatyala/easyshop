require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./models/Product");

async function run() {
  await connectDB();
  const categories = await Product.distinct("category");
  console.log("Categories in DB:", categories);
  
  for (const cat of categories) {
    const samples = await Product.find({ category: cat }).limit(5);
    console.log(`\nCategory: ${cat}`);
    samples.forEach(s => console.log(` - ${s.title} (Image: ${s.imageUrl})`));
  }
  
  await mongoose.connection.close();
  process.exit(0);
}

run();
