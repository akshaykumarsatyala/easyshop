// Run with: node updateImagesProper.js
// Updates all product images with beautiful, keyword-accurate Unsplash URLs using BULK WRITE (blazing fast!)
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");

// Map keywords to specific lists of Unsplash IDs
const keywordImages = {
  // Electronics
  "headphones": [
    "photo-1505740420928-5e560c06d30e", // Yellow
    "photo-1546435770-a3e426bf472b", // Black
    "photo-1484704849700-f032a568e944"  // Retro
  ],
  "earphones": [
    "photo-1590658268037-6bf12165a8df", // Wireless earbuds
    "photo-1608156639585-b3a032ef9689"  // Red earbuds
  ],
  "mouse": [
    "photo-1615663245857-ac93bb7c39e7", // Sleek
    "photo-1527864550417-7fd91fc51a46"  // Black wireless
  ],
  "keyboard": [
    "photo-1587829191301-c959bfb63ac2", // Mechanical
    "photo-1618384887929-16ec33fab9ef"  // Custom RGB
  ],
  "monitor": [
    "photo-1527443224154-c4a3942d3acf", // Desktop display
    "photo-1586210579191-e3b216c52c03"  // Curved display
  ],
  "speaker": [
    "photo-1608043152269-423dbba4e7e1", // JBL-like cylinder
    "photo-1545454675-3531b543be5d"  // Portable bluetooth
  ],
  "webcam": [
    "photo-1601925260368-ae2f83cf8b7f"  // Webcam
  ],
  "phone case": [
    "photo-1580870013141-3b13c5100c15", // Pastel phone cases
    "photo-1603302576837-37561b2e2302"  // Smartphone on desk
  ],
  "smartphone": [
    "photo-1511707171634-5f897ff02aa9", // Phone mock
    "photo-1598327105666-5b89351aff97"  // Android phone
  ],
  "iphone": [
    "photo-1510557880182-3d4d3cba35a5", // iPhone hand
    "photo-1565849906660-446e4b2d5c3e"  // iPhone back
  ],
  "power bank": [
    "photo-1609091839311-d5365f9ff1c5"  // Charger power bank
  ],
  "charger": [
    "photo-1583863788434-e58a36330cf0", // Wall charger block
    "photo-1619472063852-78d10b75a6c0"  // Wireless charger stand
  ],
  "usb cable": [
    "photo-1589324901375-21409ed05d3c", // Red charging cable
    "photo-1601925260368-ae2f83cf8b7f"  // Wires setup
  ],
  "hard drive": [
    "photo-1531403009284-440f080d1e12"  // Hard disk
  ],
  "ssd": [
    "photo-1544006659-f0b21f02f03f"  // SSD chip
  ],
  "motherboard": [
    "photo-1518770660439-4636190af475"  // PC Motherboard
  ],
  "ram module": [
    "photo-1518770660439-4636190af475"  // Circuit boards
  ],
  "laptop stand": [
    "photo-1625766763788-95dcce9bf5ac"  // Laptop on stand
  ],

  // Fashion / Wearables / Footwear
  "t-shirt": [
    "photo-1521572267360-ee0c2909d518", // White tee
    "photo-1583743814966-8936f5b7be1a"  // Black tee
  ],
  "jeans": [
    "photo-1541099649105-f69ad21f3246", // Blue denim jeans
    "photo-1542272604-787c62d465d1"  // Denim pants folded
  ],
  "running shoes": [
    "photo-1542291026-7eec264c27ff", // Red sneaker
    "photo-1608231387042-66d1773070a5"  // Grey sneaker
  ],
  "shoes": [
    "photo-1549298916-b41d501d3772", // Brown leather boots
    "photo-1595950653106-6c9ebd614d3a", // Colorful sneakers
    "photo-1606107557195-0e29a4b5b4aa"  // Green running shoes
  ],
  "jacket": [
    "photo-1551028719-00167b16eac5", // Yellow leather jacket
    "photo-1591047139829-d91aecb6caea"  // Blue denim jacket
  ],
  "backpack": [
    "photo-1553062407-98eeb64c6a62", // Brown leather bag
    "photo-1622560480605-d83c853bc5c3"  // Sleek black daypack
  ],
  "bag": [
    "photo-1584917865442-de89df76afd3", // Red handbag
    "photo-1590874103328-eac38a683ce7"  // Leather tote bag
  ],
  "wallet": [
    "photo-1627123424574-724758594e93"  // Leather wallet
  ],
  "watch": [
    "photo-1523275335684-37898b6baf30", // Wooden watch
    "photo-1542496658-e33a6d0d50f6", // Smart minimalist watch
    "photo-1508685096489-7aacd43bd3b1"  // Classic watch
  ],
  "socks": [
    "photo-1582966772680-860e372bb558"  // Colorful socks
  ],
  "hat": [
    "photo-1534215754734-18e55d13ce35"  // Fedora hat
  ],
  "cap": [
    "photo-1588850561407-ed78c282e89b"  // Baseball cap
  ],
  "tie": [
    "photo-1589756823855-edd134374b14"  // Classy tie
  ],
  "belt": [
    "photo-1614252369475-531eba835eb1"  // Brown leather belt
  ],
  "gloves": [
    "photo-1542840410-3092f68c9413"  // Leather gloves
  ],
  "dress": [
    "photo-1595777457583-95e059d581b8", // Blue dress
    "photo-1618932260643-eee4a2f652a6"  // Floral dress
  ],
  "shirt": [
    "photo-1602810316693-3667c854239a", // Blue flannel shirt
    "photo-1596755094514-f87e34085b2c"  // White button shirt
  ],

  // Home, Kitchen, Appliances
  "coffee mug": [
    "photo-1514228742587-6b1558fcca3d", // Teal mug
    "photo-1517256064527-09c53b2d0bc6"  // Ceramic mug with coffee
  ],
  "mug": [
    "photo-1572119363153-f21345ac7d52"  // Mugs stack
  ],
  "water bottle": [
    "photo-1602143407151-7111542de6e8", // Steel flask
    "photo-1523362628745-0c100150b504"  // Modern sports flask
  ],
  "frying pan": [
    "photo-1599940824399-b87987ceb72a"  // Cast iron skillet
  ],
  "pan": [
    "photo-1584269600464-37b1b58a9fe7"  // Pots and pans
  ],
  "blender": [
    "photo-1578643463396-0997cb5328c1"  // Smoothie blender jar
  ],
  "mixer": [
    "photo-1578643463396-0997cb5328c1"  // Kitchen appliance
  ],
  "microwave": [
    "photo-1584622650111-993a426fbf0a"  // Modern microwave kitchen
  ],
  "toaster": [
    "photo-1585238342024-78d387f4a707"  // Retro toaster toast
  ],
  "vacuum": [
    "photo-1558317374-067fb5f30001"  // Stick cordless vacuum
  ],
  "lamp": [
    "photo-1507473885765-e6ed057f782c", // Desk lamp warm glow
    "photo-1513506003901-1e6a229e2d15"  // Modern design table lamp
  ],
  "kettle": [
    "photo-1576092768241-dec231879fc3"  // Glass tea kettle water pouring
  ],
  "knife": [
    "photo-1593113630400-ea4288922497"  // Professional chef knife
  ],
  "cutting board": [
    "photo-1576092768241-dec231879fc3"  // Wooden board
  ],

  // Sports & Fitness
  "yoga mat": [
    "photo-1601925260368-ae2f83cf8b7f", // Rolled purple mat
    "photo-1592432678016-e910b452f9a2"  // Fitness mat on gym floor
  ],
  "dumbbells": [
    "photo-1517838277536-f5f99be501cd", // Gym dumbells weights
    "photo-1584735935682-2f2b69dff9d2"  // Hex iron weights
  ],
  "resistance band": [
    "photo-1598268181419-c9155267b250"  // Rubber exercise bands
  ],
  "jump rope": [
    "photo-1517838277536-f5f99be501cd"  // Rope
  ],
  "skipping rope": [
    "photo-1517838277536-f5f99be501cd"
  ],
  "football": [
    "photo-1508098682722-e99c43a406b2", // Soccer ball on grass
    "photo-1518063319789-7217e6706b04"  // American football
  ],
  "basketball": [
    "photo-1546519638-68e109498ffc"  // Basketball on court
  ],
  "bicycle": [
    "photo-1485965120184-e220f721d03e", // Road bike
    "photo-1532298229144-0ec0c57515c7"  // Hybrid bike city
  ],
  "skateboard": [
    "photo-1564982752979-3f7bc974d29a"  // Skateboard under light
  ],
  "fitness tracker": [
    "photo-1575311373937-8109ee0f6a09"  // Fitbit fitness band
  ],
  "tennis racket": [
    "photo-1622279457486-62dcc4a431d6"  // Tennis racket ball
  ],

  // Books
  "novel": [
    "photo-1544947950-fa07a98d237f", // Novel hardcover stack
    "photo-1512820790803-83ca734da794"  // Pages open
  ],
  "book": [
    "photo-1497633762265-9d179a990aa6", // Books shelf vintage
    "photo-1512820790803-83ca734da794"  // Reading cozy
  ],
  "comic": [
    "photo-1618519764620-7403abdbfee9"  // Marvel/DC comic issues
  ],
  "guide": [
    "photo-1488646953014-85cb44e25828"  // Map travel book
  ],

  // Toys & Games
  "puzzle": [
    "photo-1586075010923-2dd45e9b2d4f"  // Jigsaw puzzle flatlay
  ],
  "board game": [
    "photo-1610890716171-6b1bb98ffd09"  // Board game pieces dice
  ],
  "action figure": [
    "photo-1559583985-c80d8ad9b29f"  // Superhero figure toy
  ],
  "building blocks": [
    "photo-1585747860715-2ba37e788b70"  // Lego bricks
  ],
  "video game": [
    "photo-1538481199705-c710c4e965fc", // Gamepad controller
    "photo-1600861195091-690c92f1d2cc"  // Xbox style pad
  ],
  "toy": [
    "photo-1596464716127-f2a82984de30"  // Wooden kids toys
  ],
  "doll": [
    "photo-1559583985-c80d8ad9b29f"
  ],

  // Office Supplies
  "notebook": [
    "photo-1531346878377-a5be20888e57", // Notebook on table
    "photo-1516414447565-b14be0adf13e"  // Blank journal open
  ],
  "pen": [
    "photo-1583485088034-697b5bc54ccd"  // Stationary pens markers
  ],
  "pencil": [
    "photo-1513542789411-b6a5d4f31634"  // Sketching pencils
  ],
  "chair": [
    "photo-1505797149-43b0069ec26b"  // Ergonomic office mesh chair
  ],
  "desk": [
    "photo-1518455027359-f3f8164ba6bd"  // Minimal study wooden desk
  ],
  "calculator": [
    "photo-1587144189608-46da0d8e874e"  // Clean white office calculator
  ],

  // Beauty & Personal Care / Cosmetics
  "lipstick": [
    "photo-1586495777744-4413f21062fa"  // Cosmetics lipstick beauty
  ],
  "face wash": [
    "photo-1556228720-195a672e8a03"  // Cream bottle pump
  ],
  "moisturizer": [
    "photo-1608248597481-496100c80836"  // Serums dropper cream pots
  ],
  "sunscreen": [
    "photo-1598440947619-2c35fc9aa908"  // Sunblock spray bottle
  ],
  "perfume": [
    "photo-1541643600914-78b084683601"  // Perfume bottle
  ],
  "shampoo": [
    "photo-1608248597481-496100c80836"
  ],
  "conditioner": [
    "photo-1608248597481-496100c80836"
  ],
  "soap": [
    "photo-1607006342440-b2b2b100808a"  // Handcrafted soap bar
  ],
  "deodorant": [
    "photo-1541643600914-78b084683601"
  ],
  "lotion": [
    "photo-1556228720-195a672e8a03"
  ],
  "face mask": [
    "photo-1596755094514-f87e34085b2c"
  ],

  // Automotive
  "car cover": [
    "photo-1568605117036-5fe5e7bab0b7", // Sleek sports car exterior
    "photo-1503376780353-7e6692767b70"  // Porsche cover silhouette
  ],
  "seat cover": [
    "photo-1617469767053-d3b508a0d982", // Beautiful luxury car interior leather seat
    "photo-1552519507-da3b142c6e3d"  // Dashboard leather seats
  ],
  "dash cam": [
    "photo-1618083707368-b3823daa2726", // Road through dashboard windshield view
    "photo-1506015391300-4802dc74de2e"  // Driving road dashboard view
  ],
  "tyre inflator": [
    "photo-1580273916550-e323be2ae537"  // Car wheel tyre pump service
  ],
  "air compressor": [
    "photo-1580273916550-e323be2ae537"
  ],
  "helmet": [
    "photo-1629909615184-74f495363b67", // Sleek matte black motorcycle helmet
    "photo-1599819811279-d5ad9cccf838"  // Visor biker helmet
  ],
  "phone holder": [
    "photo-1618083707368-b3823daa2726"  // Car dashboard phone mount mount
  ],

  // Baby
  "baby blanket": [
    "photo-1522850959496-3a7772507e5c"  // Baby wrapped in cozy knit blanket
  ],
  "diapers": [
    "photo-1596464716127-f2a82984de30"
  ],
  "feeding bottle": [
    "photo-1596464716127-f2a82984de30"
  ],

  // Grocery
  "cooking oil": [
    "photo-1474979266404-7eaacbcd87c5"  // Pouring golden olive oil bottle
  ],
  "tea": [
    "photo-1576092768241-dec231879fc3"  // Herbal loose tea cup
  ],
  "rice": [
    "photo-1586201375761-83865001e31c"  // Clean white rice grains in bowl
  ],
};

// Fallback images based on categories
const categoryFallbacks = {
  "Electronics": [
    "photo-1505740420928-5e560c06d30e",
    "photo-1527864550417-7fd91fc51a46",
    "photo-1608043152269-423dbba4e7e1"
  ],
  "Wearables": [
    "photo-1546868871-7041f2a55e12",
    "photo-1575311373937-8109ee0f6a09"
  ],
  "Home Appliances": [
    "photo-1558317374-067fb5f30001"
  ],
  "Clothing": [
    "photo-1602810316693-3667c854239a"
  ],
  "Footwear": [
    "photo-1542291026-7eec264c27ff"
  ],
  "Home": [
    "photo-1507473885765-e6ed057f782c",
    "photo-1514228742587-6b1558fcca3d"
  ],
  "Kitchen": [
    "photo-1577563908411-5077b6dc7624"
  ],
  "Accessories": [
    "photo-1627123424574-724758594e93"
  ],
  "Bags": [
    "photo-1553062407-98eeb64c6a62"
  ],
  "Automotive": [
    "photo-1568605117036-5fe5e7bab0b7",
    "photo-1617469767053-d3b508a0d982"
  ],
  "Baby": [
    "photo-1596464716127-f2a82984de30",
    "photo-1522850959496-3a7772507e5c"
  ],
  "Beauty": [
    "photo-1586495777744-4413f21062fa",
    "photo-1608248597481-496100c80836"
  ],
  "Grocery": [
    "photo-1597362925123-77861d3fbac7"
  ]
};

// Deterministic hash to cycle through image arrays based on title
function getHashedIndex(title, length) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    const char = title.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) % length;
}

function resolveUnsplashUrl(photoId) {
  return `https://images.unsplash.com/${photoId}?w=600&h=600&fit=crop&q=80`;
}

async function run() {
  try {
    await connectDB();
    console.log("✅ Database connected for bulk update");

    const products = await Product.find({});
    console.log(`Preparing bulk write updates for ${products.length} products...`);

    const bulkOps = [];

    for (const product of products) {
      const titleLower = product.title.toLowerCase();
      let selectedPhotoId = null;

      // 1. Search for specific product type keyword matching in title
      for (const [kw, ids] of Object.entries(keywordImages)) {
        if (titleLower.includes(kw)) {
          const index = getHashedIndex(product.title, ids.length);
          selectedPhotoId = ids[index];
          break;
        }
      }

      // 2. Fallback to category array
      if (!selectedPhotoId) {
        const fallbackIds = categoryFallbacks[product.category] || categoryFallbacks["Electronics"];
        const index = getHashedIndex(product.title, fallbackIds.length);
        selectedPhotoId = fallbackIds[index];
      }

      const properUrl = resolveUnsplashUrl(selectedPhotoId);

      // 3. Queue update operation if different
      if (product.imageUrl !== properUrl) {
        bulkOps.push({
          updateOne: {
            filter: { _id: product._id },
            update: { $set: { imageUrl: properUrl } }
          }
        });
      }
    }

    if (bulkOps.length > 0) {
      console.log(`Executing bulkWrite of ${bulkOps.length} updates...`);
      const result = await Product.bulkWrite(bulkOps);
      console.log(`✅ Bulk write complete! Modified: ${result.modifiedCount} products`);
    } else {
      console.log(`✅ All products are already mapping to correct high-fidelity images!`);
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Bulk update failed:", err.message);
    process.exit(1);
  }
}

run();
