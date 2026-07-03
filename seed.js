/**
 * SEED SCRIPT FOR EASYSHOP PRODUCTS
 * ===================================
 * 
 * This script loads 1,000+ products from products-1000.json into your MongoDB database.
 * 
 * USAGE:
 * ------
 * 1. Place this file in your backend folder (easyshop/backend/)
 * 2. Place products-1000.json in the same folder
 * 3. Run: npm run seed
 *    (or manually: node seed.js)
 * 
 * The script will:
 * - Connect to MongoDB using your MONGO_URI from .env
 * - Clear existing products (WARNING: deletes all current products!)
 * - Insert all 1,000+ new products
 * - Show success message with count
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

// Define Product Schema (matches your backend model)
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  imageUrl: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 4.0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  hidden: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/easyshop';
    console.log(`📦 Connecting to MongoDB: ${mongoUri}`);
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Read products from JSON file
    const productsPath = path.join(__dirname, 'products-1000.json');
    
    if (!fs.existsSync(productsPath)) {
      console.error('❌ Error: products-1000.json not found in backend folder!');
      console.error(`   Expected location: ${productsPath}`);
      process.exit(1);
    }

    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    const products = productsData.products;

    console.log(`\n📥 Loaded ${products.length} products from JSON`);

    // Clear existing products
    console.log('🗑️  Clearing existing products...');
    const deleteResult = await Product.deleteMany({});
    console.log(`   Deleted ${deleteResult.deletedCount} old products`);

    // Insert new products
    console.log('📝 Inserting new products...');
    const insertResult = await Product.insertMany(products);
    
    console.log('\n✅ SUCCESS! Products seeded:');
    console.log(`   Total inserted: ${insertResult.length}`);
    console.log(`   Categories: ${[...new Set(products.map(p => p.category))].join(', ')}`);
    
    // Show some stats
    const stats = {};
    products.forEach(p => {
      stats[p.category] = (stats[p.category] || 0) + 1;
    });
    
    console.log('\n📊 Products by category:');
    Object.entries(stats).forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} products`);
    });

    console.log('\n✨ Your EasyShop store is now populated and ready to go!');
    console.log('   🛍️  Visit: http://localhost:5173/');
    console.log('   🔐 Admin panel: http://localhost:5173/admin/login');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
