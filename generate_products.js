// Generate 1,000+ products for EasyShop
const fs = require('fs');

const categories = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Books',
  'Sports & Fitness',
  'Beauty & Personal Care',
  'Toys & Games',
  'Office Supplies'
];

const productData = {
  'Electronics': [
    { base: 'Wireless Headphones', minPrice: 1000, maxPrice: 5000 },
    { base: 'Phone Case', minPrice: 200, maxPrice: 800 },
    { base: 'Screen Protector', minPrice: 100, maxPrice: 500 },
    { base: 'Charger', minPrice: 300, maxPrice: 1500 },
    { base: 'USB Cable', minPrice: 100, maxPrice: 600 },
    { base: 'Power Bank', minPrice: 800, maxPrice: 3000 },
    { base: 'Webcam', minPrice: 2000, maxPrice: 8000 },
    { base: 'Keyboard', minPrice: 2000, maxPrice: 8000 },
    { base: 'Mouse', minPrice: 500, maxPrice: 2000 },
    { base: 'Monitor', minPrice: 8000, maxPrice: 25000 },
    { base: 'Laptop Stand', minPrice: 500, maxPrice: 2000 },
    { base: 'External Hard Drive', minPrice: 2500, maxPrice: 8000 },
    { base: 'SSD', minPrice: 3000, maxPrice: 10000 },
    { base: 'RAM Module', minPrice: 2000, maxPrice: 8000 },
    { base: 'Motherboard', minPrice: 5000, maxPrice: 20000 }
  ],
  'Fashion': [
    { base: 'T-Shirt', minPrice: 300, maxPrice: 1000 },
    { base: 'Jeans', minPrice: 800, maxPrice: 2500 },
    { base: 'Shoes', minPrice: 1500, maxPrice: 5000 },
    { base: 'Jacket', minPrice: 2000, maxPrice: 8000 },
    { base: 'Dress', minPrice: 1500, maxPrice: 5000 },
    { base: 'Shorts', minPrice: 500, maxPrice: 1500 },
    { base: 'Shirt', minPrice: 800, maxPrice: 2000 },
    { base: 'Sweatshirt', minPrice: 1000, maxPrice: 3000 },
    { base: 'Socks', minPrice: 100, maxPrice: 500 },
    { base: 'Hat', minPrice: 300, maxPrice: 1500 },
    { base: 'Scarf', minPrice: 400, maxPrice: 1500 },
    { base: 'Gloves', minPrice: 300, maxPrice: 1000 },
    { base: 'Belt', minPrice: 400, maxPrice: 1500 },
    { base: 'Tie', minPrice: 400, maxPrice: 1200 },
    { base: 'Underwear', minPrice: 200, maxPrice: 800 }
  ],
  'Home & Kitchen': [
    { base: 'Coffee Mug', minPrice: 150, maxPrice: 800 },
    { base: 'Water Bottle', minPrice: 500, maxPrice: 2000 },
    { base: 'Frying Pan', minPrice: 800, maxPrice: 3000 },
    { base: 'Plate Set', minPrice: 1000, maxPrice: 4000 },
    { base: 'Bowl', minPrice: 200, maxPrice: 1000 },
    { base: 'Spoon Set', minPrice: 300, maxPrice: 1500 },
    { base: 'Knife', minPrice: 400, maxPrice: 2000 },
    { base: 'Cutting Board', minPrice: 400, maxPrice: 1500 },
    { base: 'Mixer', minPrice: 2000, maxPrice: 8000 },
    { base: 'Blender', minPrice: 2000, maxPrice: 8000 },
    { base: 'Toaster', minPrice: 1500, maxPrice: 5000 },
    { base: 'Microwave', minPrice: 5000, maxPrice: 15000 },
    { base: 'Tea Kettle', minPrice: 800, maxPrice: 3000 },
    { base: 'Storage Container', minPrice: 300, maxPrice: 1500 },
    { base: 'Dish Rack', minPrice: 500, maxPrice: 2000 }
  ],
  'Books': [
    { base: 'Novel', minPrice: 200, maxPrice: 600 },
    { base: 'Self-Help Book', minPrice: 300, maxPrice: 800 },
    { base: 'Biography', minPrice: 400, maxPrice: 1000 },
    { base: 'Mystery', minPrice: 250, maxPrice: 700 },
    { base: 'Science Fiction', minPrice: 300, maxPrice: 800 },
    { base: 'History Book', minPrice: 400, maxPrice: 1200 },
    { base: 'Cookbook', minPrice: 500, maxPrice: 1500 },
    { base: 'Children Book', minPrice: 200, maxPrice: 600 },
    { base: 'Comic Book', minPrice: 150, maxPrice: 500 },
    { base: 'Technical Guide', minPrice: 600, maxPrice: 2000 },
    { base: 'Business Book', minPrice: 400, maxPrice: 1200 },
    { base: 'Art Book', minPrice: 800, maxPrice: 3000 },
    { base: 'Poetry', minPrice: 300, maxPrice: 800 },
    { base: 'Travel Guide', minPrice: 400, maxPrice: 1200 },
    { base: 'Educational Book', minPrice: 300, maxPrice: 1000 }
  ],
  'Sports & Fitness': [
    { base: 'Yoga Mat', minPrice: 500, maxPrice: 2000 },
    { base: 'Dumbbells', minPrice: 500, maxPrice: 3000 },
    { base: 'Resistance Band', minPrice: 300, maxPrice: 1500 },
    { base: 'Jump Rope', minPrice: 200, maxPrice: 800 },
    { base: 'Running Shoes', minPrice: 1500, maxPrice: 5000 },
    { base: 'Gym Bag', minPrice: 800, maxPrice: 3000 },
    { base: 'Sports Bottle', minPrice: 400, maxPrice: 1500 },
    { base: 'Tennis Racket', minPrice: 2000, maxPrice: 8000 },
    { base: 'Badminton Set', minPrice: 1000, maxPrice: 4000 },
    { base: 'Cricket Bat', minPrice: 1500, maxPrice: 6000 },
    { base: 'Football', minPrice: 500, maxPrice: 2000 },
    { base: 'Basketball', minPrice: 800, maxPrice: 2500 },
    { base: 'Bicycle', minPrice: 5000, maxPrice: 20000 },
    { base: 'Skateboard', minPrice: 1500, maxPrice: 5000 },
    { base: 'Fitness Tracker', minPrice: 3000, maxPrice: 10000 }
  ],
  'Beauty & Personal Care': [
    { base: 'Face Wash', minPrice: 100, maxPrice: 800 },
    { base: 'Moisturizer', minPrice: 200, maxPrice: 1500 },
    { base: 'Sunscreen', minPrice: 200, maxPrice: 1200 },
    { base: 'Shampoo', minPrice: 100, maxPrice: 600 },
    { base: 'Conditioner', minPrice: 100, maxPrice: 600 },
    { base: 'Soap', minPrice: 50, maxPrice: 400 },
    { base: 'Toothbrush', minPrice: 50, maxPrice: 300 },
    { base: 'Toothpaste', minPrice: 50, maxPrice: 300 },
    { base: 'Face Mask', minPrice: 200, maxPrice: 1000 },
    { base: 'Lipstick', minPrice: 300, maxPrice: 1500 },
    { base: 'Perfume', minPrice: 500, maxPrice: 3000 },
    { base: 'Deodorant', minPrice: 150, maxPrice: 600 },
    { base: 'Body Lotion', minPrice: 200, maxPrice: 1000 },
    { base: 'Hair Oil', minPrice: 100, maxPrice: 800 },
    { base: 'Razor', minPrice: 300, maxPrice: 1200 }
  ],
  'Toys & Games': [
    { base: 'Puzzle', minPrice: 300, maxPrice: 1500 },
    { base: 'Board Game', minPrice: 500, maxPrice: 2500 },
    { base: 'Action Figure', minPrice: 300, maxPrice: 1500 },
    { base: 'Building Blocks', minPrice: 400, maxPrice: 2000 },
    { base: 'Remote Control Car', minPrice: 800, maxPrice: 3500 },
    { base: 'Video Game', minPrice: 1500, maxPrice: 3500 },
    { base: 'Doll', minPrice: 400, maxPrice: 2000 },
    { base: 'Skateboard Toy', minPrice: 200, maxPrice: 1000 },
    { base: 'Trading Card', minPrice: 100, maxPrice: 1000 },
    { base: 'Bike Toy', minPrice: 300, maxPrice: 1500 },
    { base: 'Kite', minPrice: 200, maxPrice: 1000 },
    { base: 'Ball', minPrice: 200, maxPrice: 1000 },
    { base: 'Bicycle Toy', minPrice: 400, maxPrice: 2000 },
    { base: 'Magic Tricks', minPrice: 500, maxPrice: 2000 },
    { base: 'Scooter', minPrice: 1500, maxPrice: 5000 }
  ],
  'Office Supplies': [
    { base: 'Notebook', minPrice: 100, maxPrice: 500 },
    { base: 'Pen Set', minPrice: 150, maxPrice: 800 },
    { base: 'Pencil', minPrice: 50, maxPrice: 300 },
    { base: 'File Folder', minPrice: 100, maxPrice: 600 },
    { base: 'Stapler', minPrice: 200, maxPrice: 800 },
    { base: 'Tape', minPrice: 50, maxPrice: 300 },
    { base: 'Paper Ream', minPrice: 300, maxPrice: 1000 },
    { base: 'Desk Organizer', minPrice: 300, maxPrice: 1500 },
    { base: 'Desk Lamp', minPrice: 800, maxPrice: 3000 },
    { base: 'Chair', minPrice: 3000, maxPrice: 12000 },
    { base: 'Desk', minPrice: 5000, maxPrice: 20000 },
    { base: 'Filing Cabinet', minPrice: 2000, maxPrice: 8000 },
    { base: 'Calculator', minPrice: 300, maxPrice: 1500 },
    { base: 'Highlighter', minPrice: 50, maxPrice: 400 },
    { base: 'Shredder', minPrice: 1000, maxPrice: 5000 }
  ]
};

const imageUrls = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1514432324607-2e467f4af3fb?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1507843217343-583f7270bfba?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1599934611223-4496eb062bba?w=500&h=500&fit=crop'
];

function generateProducts() {
  const products = [];
  let productId = 1;

  for (const category of categories) {
    const categoryProducts = productData[category];
    
    // Generate 120-130 products per category (8 categories = ~1000 products)
    for (let i = 0; i < 130; i++) {
      const template = categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
      const variants = ['Pro', 'Plus', 'Max', 'Ultra', 'Lite', 'Standard', 'Premium', 'Deluxe', ''];
      const variant = variants[Math.floor(Math.random() * variants.length)];
      const colors = ['Black', 'White', 'Blue', 'Red', 'Green', 'Silver', 'Gold', 'Rose Gold'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const title = `${template.base} ${variant} - ${color}`.trim();
      const price = Math.floor(Math.random() * (template.maxPrice - template.minPrice + 1)) + template.minPrice;
      const stock = Math.floor(Math.random() * 400) + 50;
      const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

      products.push({
        id: productId++,
        title,
        category,
        price,
        stock,
        imageUrl,
        description: `High quality ${title.toLowerCase()}. Perfect for your needs.`,
        rating: Math.random() * 2 + 3,
        reviews: Math.floor(Math.random() * 500)
      });
    }
  }

  return products;
}

const products = generateProducts();
const output = { products };

fs.writeFileSync('/home/claude/products-1000.json', JSON.stringify(output, null, 2));
console.log(`Generated ${products.length} products!`);
console.log('File saved to: /home/claude/products-1000.json');
