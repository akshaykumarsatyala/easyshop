const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    // Optional "was" price to show a discount / strikethrough
    compareAtPrice: { type: Number, default: null },
    category: { type: String, default: "General", trim: true },
    // Path/URL of the uploaded image (served from /uploads or an external URL
    // if you upload the original image from another site and just paste the link)
    imageUrl: { type: String, required: true },
    stock: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
    rating: { type: Number, default: 4.0, min: 0, max: 5 },
    reviews: { type: Number, default: 0, min: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

productSchema.index({ title: "text", description: "text", category: "text" });

module.exports = mongoose.model("Product", productSchema);
