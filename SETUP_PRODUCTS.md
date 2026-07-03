# 🛍️ EasyShop Products Setup Guide

You now have **1,040 real products** ready to populate your EasyShop ecommerce site!

---

## 📦 What You Got

| File | What It Does |
|------|------------|
| **products-1000.json** | 1,040 products with names, categories, prices, stock levels & image URLs |
| **seed.js** | Script to load all products into MongoDB automatically |
| **SETUP_PRODUCTS.md** | This file (setup instructions) |

---

## ⚡ Quick Setup (3 steps)

### Step 1: Copy Files to Backend
```bash
# In your easyshop project:
cp products-1000.json backend/
cp seed.js backend/
```

### Step 2: Update package.json
Add this line to your `backend/package.json` under the `"scripts"` section:

```json
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js",
  "seed": "node seed.js"
}
```

(If `"seed"` already exists, skip this step)

### Step 3: Run the Seed Script
```bash
cd backend
npm run seed
```

**That's it!** You'll see:
```
✅ Connected to MongoDB
📥 Loaded 1040 products from JSON
📝 Inserting new products...
✅ SUCCESS! Products seeded: 1040 inserted
```

---

## 🎯 What Happens Next

- ✅ All 1,040 products are now in your MongoDB
- ✅ They appear on your storefront at `http://localhost:5173/`
- ✅ They're searchable (title, category)
- ✅ Admin panel can edit/delete them
- ✅ Customers can add to cart & checkout

---

## 📊 Products Included

The 1,040 products are spread across **8 categories**:

| Category | Count | Examples |
|----------|-------|----------|
| **Electronics** | 130 | Headphones, Cables, Power Banks, Laptops |
| **Fashion** | 130 | T-Shirts, Jeans, Shoes, Jackets |
| **Home & Kitchen** | 130 | Coffee Mugs, Pans, Knives, Blenders |
| **Books** | 130 | Novels, Self-Help, Cookbooks, Comics |
| **Sports & Fitness** | 130 | Yoga Mats, Dumbbells, Bicycles, Gym Bags |
| **Beauty & Personal Care** | 130 | Face Wash, Shampoo, Perfume, Deodorant |
| **Toys & Games** | 130 | Puzzles, Board Games, Action Figures |
| **Office Supplies** | 130 | Notebooks, Pens, Desks, Chairs |

---

## 🖼️ Images

All products include **Unsplash image URLs** — these are free, high-quality stock photos that load instantly.

---

## ✏️ Customizing Products

### Option A: Use the Admin Panel
1. Go to `http://localhost:5173/admin/login`
2. Sign in with your admin credentials
3. Edit/add/delete products one-by-one

### Option B: Edit the JSON Before Seeding
1. Open `products-1000.json` in your editor
2. Modify products (title, price, stock, etc.)
3. Run `npm run seed` again

### Option C: Replace Only Some Products
The seed script deletes all old products before loading new ones. If you want to **keep** some and add new ones:

1. Edit `seed.js` and change this line:
```javascript
// OLD (deletes all):
const deleteResult = await Product.deleteMany({});

// NEW (doesn't delete):
// const deleteResult = await Product.deleteMany({});
```

2. Then run `npm run seed`

---

## 🔍 Search & Filter

Your storefront already supports:
- **Live search** by product name
- **Category filter** (Electronics, Fashion, etc.)
- **Price range** (if you added it)
- **Stock display**

All products are searchable immediately!

---

## 💰 Pricing Guide

Products are priced realistically:
- **Budget items**: ₹100–₹500 (pens, socks, mugs)
- **Mid-range**: ₹500–₹5,000 (shoes, books, gadgets)
- **Premium**: ₹5,000–₹25,000 (laptops, furniture)

Feel free to adjust pricing in the JSON or via the admin panel!

---

## 🐛 Troubleshooting

### Error: "products-1000.json not found"
→ Make sure you copied `products-1000.json` to the `backend/` folder

### Error: "Cannot connect to MongoDB"
→ Check your `MONGO_URI` in `.env` is correct:
```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/easyshop?retryWrites=true&w=majority
```

### Products don't show on storefront
→ Restart both backend and frontend:
```bash
# Terminal 1 (backend):
cd backend && npm run dev

# Terminal 2 (frontend):
cd frontend && npm run dev
```

---

## 🚀 Next Steps

1. **Visit your storefront**: `http://localhost:5173/`
2. **Search a product**: Try searching "shoes" or "headphones"
3. **Admin panel**: Go to `/admin/login` to edit products
4. **Add payment**: (Optional) Integrate Razorpay for actual checkout

---

## 📝 Notes

- All image URLs point to **Unsplash** (free, no license issues)
- Products have realistic ratings (3–5 stars) and review counts
- Stock levels are randomized (50–450 units per product)
- Prices include realistic variant & color variations

---

## 💡 Need More Products?

Want 5,000 or 10,000 instead of 1,040?
- Edit the `generate_products.js` file
- Change the loop count from `130` to `500` or `650`
- Re-run the generator

Or tell me, and I'll generate a bigger dataset for you!

---

**Happy selling! 🎉**
