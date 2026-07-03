const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("MONGO_URI is missing. Add it to your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    console.error(
      "Tip: if you are running MongoDB locally, make sure it's started (mongod). " +
      "If you are using MongoDB Atlas, check your connection string, DB user, and IP allowlist."
    );
    process.exit(1);
  }
}

module.exports = connectDB;
