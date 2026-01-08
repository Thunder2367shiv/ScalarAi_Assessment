import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import {connectDB} from '../config/db.js';

dotenv.config();

const products = [
  {
    name: "Echo Dot (5th Gen) | Deep Sea Blue",
    image: "https://m.media-amazon.com/images/I/71KIo0RNRVL._AC_UF894,1000_QL80_.jpg",
    description: "Our best sounding Echo Dot yet — enjoy an improved audio experience.",
    brand: "Amazon", category: "Electronics", price: 49.99, countInStock: 10, rating: 4.5, numReviews: 120,
  },
  {
    name: "Apple iPhone 15 Pro, 128GB, Natural Titanium",
    image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone_15_pro.png",
    description: "Forged in titanium and featuring the groundbreaking A17 Pro chip.",
    brand: "Apple", category: "Electronics", price: 999.00, countInStock: 5, rating: 4.8, numReviews: 85,
  },
  {
    name: "Sony WH-1000XM5 Wireless Headphones",
    image: "https://m.media-amazon.com/images/I/61ULAZmt9NL.jpg",
    description: "Industry leading noise canceling with two processors controlling 8 microphones.",
    brand: "Sony", category: "Electronics", price: 398.00, countInStock: 12, rating: 4.7, numReviews: 2450,
  },
  {
    name: "Kindle Paperwhite (16 GB)",
    image: "https://m.media-amazon.com/images/I/516ioi1kzGL._AC_UF894,1000_QL80_.jpg",
    description: "Purpose-built for reading with a 300 ppi glare-free display.",
    brand: "Amazon", category: "Electronics", price: 149.99, countInStock: 25, rating: 4.6, numReviews: 5300,
  },
  {
    name: "Samsung 32-Inch The Frame TV",
    image: "https://images.samsung.com/is/image/samsung/p6pim/uk/qe32ls03cbuxxu/gallery/uk-the-frame-32ls03c-qe32ls03cbuxxu-536703160",
    description: "Enjoy your personal art exhibit when you’re not watching TV.",
    brand: "Samsung", category: "Electronics", price: 597.99, countInStock: 8, rating: 4.4, numReviews: 890,
  },
  {
    name: "Logitech MX Master 3S Mouse",
    image: "https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1500_.jpg",
    description: "Ultra-fast scrolling, 8K DPI tracking on any surface.",
    brand: "Logitech", category: "Electronics", price: 99.00, countInStock: 30, rating: 4.8, numReviews: 1560,
  },
  {
    name: "Nintendo Switch – OLED Model",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&q=80&w=1000",
    description: "7-inch OLED screen, wide adjustable stand, and wired LAN port.",
    brand: "Nintendo", category: "Gaming", price: 349.99, countInStock: 15, rating: 4.9, numReviews: 8900,
  },
  {
    name: "Instant Pot Duo 7-in-1 Cooker",
    image: "https://m.media-amazon.com/images/I/71Z401LjFFL.jpg",
    description: "Pressure cook, slow cook, rice cook, yogurt maker, steamer, sauté pan and food warmer.",
    brand: "Instant Pot", category: "Kitchen", price: 89.00, countInStock: 20, rating: 4.7, numReviews: 15000,
  },
  {
    name: "Apple MacBook Air M2",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkau_0XTDoRSLg9hzZQ8xYE6v9lPpe6nocwg&s",
    description: "Strikingly thin design with the blazing fast M2 chip.",
    brand: "Apple", category: "Electronics", price: 1099.00, countInStock: 10, rating: 4.8, numReviews: 3200,
  },
  {
    name: "Ninja Air Fryer AF101",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgo3BKRs_RI040ip3uSyGMjzFhd01eqL_5qg&s",
    description: "Crisp, roast, reheat, and dehydrate for quick and easy meals.",
    brand: "Ninja", category: "Kitchen", price: 119.99, countInStock: 18, rating: 4.8, numReviews: 45000,
  },
  {
    name: "Bose SoundLink Revolve+ II",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfNLIC1Z9RYcSUH3d4Nl37pSl_l8mqt-9Avg&s",
    description: "True 360° sound for consistent, uniform coverage.",
    brand: "Bose", category: "Electronics", price: 229.00, countInStock: 14, rating: 4.6, numReviews: 2100,
  },
  {
    name: "KitchenAid Artisan Series 5-Qt",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyH2Okt6b8Kz8u23eYoHUz30T0ogR_hUINuw&s",
    description: "The power and durability to take on any task in the kitchen.",
    brand: "KitchenAid", category: "Kitchen", price: 449.99, countInStock: 5, rating: 4.9, numReviews: 12000,
  },
  {
    name: "Dyson V11 Cordless Vacuum",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB0D7hh-xCI4uZx9G25Z6QPVMFNwt-RySSWQ&s",
    description: "Intelligently optimizes suction and run time across all floor types.",
    brand: "Dyson", category: "Home", price: 569.99, countInStock: 7, rating: 4.5, numReviews: 3100,
  },
  {
    name: "Hydro Flask 32 oz Wide Mouth",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBcq4lRYjUw_8vTy8paAy4pqpNRvmSweI3yQ&s",
    description: "TempShield insulation keeps drinks cold up to 24 hours.",
    brand: "Hydro Flask", category: "Home", price: 44.95, countInStock: 50, rating: 4.8, numReviews: 18000,
  },
  {
    name: "Corsair K70 RGB Mechanical Keyboard",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKjpMwK_cQwR0TJl7gy4-Xtfi8NYS5Op9QfA&s",
    description: "PBT double-shot keycaps and CHERRY MX mechanical switches.",
    brand: "Corsair", category: "Gaming", price: 159.99, countInStock: 12, rating: 4.7, numReviews: 4200,
  },
  {
    name: "Nespresso Vertuo Next Coffee Machine",
    image: "https://m.media-amazon.com/images/I/51hobtRU0ML._AC_UF894,1000_QL80_.jpg",
    description: "Sustainable design made from 54% recycled plastics.",
    brand: "Nespresso", category: "Kitchen", price: 179.00, countInStock: 22, rating: 4.3, numReviews: 5600,
  },
 

  // ================= GAMING =================
  {
    name: "Sony PlayStation 5 Console",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKdNeTi6HrbjxaVVogiJnB13QlbS3HzH3hew&s",
    description:
      "Experience lightning-fast loading, ultra-high-speed SSD, immersive haptic feedback, adaptive triggers, and stunning 4K gaming performance.",
    brand: "Sony",
    category: "Gaming",
    price: 499.99,
    countInStock: 6,
    rating: 4.9,
    numReviews: 10200,
  },

  // ================= FASHION =================
  {
    name: "Levi's Men's 511 Slim Fit Jeans",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbN-BMwnvPbS-VNb91bz1zkmHnYhF1TK1A7g&s",
    description:
      "Modern slim-fit jeans with added stretch for comfort. Designed for everyday wear with a clean and classic look.",
    brand: "Levi's",
    category: "Fashion",
    price: 59.99,
    countInStock: 40,
    rating: 4.6,
    numReviews: 7800,
  },
  {
    name: "Nike Air Force 1 '07 Sneakers",
    image: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png",
    description:
      "Iconic basketball-inspired sneakers with premium leather, durable cushioning, and timeless street-style appeal.",
    brand: "Nike",
    category: "Fashion",
    price: 110.0,
    countInStock: 25,
    rating: 4.8,
    numReviews: 12000,
  },

  // ================= BOOKS =================
  {
    name: "Atomic Habits – James Clear",
    image: "https://m.media-amazon.com/images/I/817HaeblezL._AC_UF1000,1000_QL80_.jpg",
    description:
      "A practical guide to building good habits and breaking bad ones using proven psychology and real-life examples.",
    brand: "Penguin",
    category: "Books",
    price: 19.99,
    countInStock: 100,
    rating: 4.9,
    numReviews: 150000,
  },

  // ================= SPORTS =================
  {
    name: "Adidas FIFA Pro Football",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVJkEssx3hT-3buZbpxBEvRbWWEn92A0l6Jw&s",
    description:
      "Professional-grade football with seamless surface, excellent shape retention, and match-level performance.",
    brand: "Adidas",
    category: "Sports",
    price: 34.99,
    countInStock: 60,
    rating: 4.7,
    numReviews: 2100,
  },

  // ================= FITNESS =================
  {
    name: "Bowflex SelectTech 552 Adjustable Dumbbells",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPMgxiA4Lw5T-1GMwy6chTipGqdSLUIi09-w&s",
    description:
      "Space-saving adjustable dumbbells replacing 15 sets of weights. Perfect for home workouts and strength training.",
    brand: "Bowflex",
    category: "Fitness",
    price: 429.0,
    countInStock: 8,
    rating: 4.8,
    numReviews: 9200,
  },

  // ================= BEAUTY =================
  {
    name: "Maybelline Fit Me Matte + Poreless Foundation",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPbYIsun3GyCIeBICO-fJ9p3QFdJ_-4BkoSg&s",
    description:
      "Lightweight foundation that mattifies skin, minimizes pores, and provides a natural, seamless finish.",
    brand: "Maybelline",
    category: "Beauty",
    price: 8.99,
    countInStock: 80,
    rating: 4.5,
    numReviews: 54000,
  },

  // ================= HOME & FURNITURE =================
  {
    name: "IKEA MALM Bed Frame (Queen)",
    image: "https://www.ikea.com/in/en/images/products/malm-bed-frame-high-black-brown__0638608_pe699032_s5.jpg",
    description:
      "Minimalist Scandinavian bed frame with durable construction and modern aesthetics.",
    brand: "IKEA",
    category: "Furniture",
    price: 299.99,
    countInStock: 10,
    rating: 4.4,
    numReviews: 6200,
  },

  // ================= OFFICE =================
  {
    name: "Ergonomic Office Chair with Lumbar Support",
    image: "https://m.media-amazon.com/images/I/61Uv-FfdGGL._AC_UF894,1000_QL80_.jpg",
    description:
      "Breathable mesh chair with adjustable height, lumbar support, and smooth-rolling wheels for long work hours.",
    brand: "Hbada",
    category: "Office",
    price: 189.99,
    countInStock: 15,
    rating: 4.6,
    numReviews: 9800,
  },

  // ================= TOYS =================
  {
    name: "LEGO Classic Creative Brick Box",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJajpSzjNQn4Yfmi-FT6br-_LY676aCebnJQ&s",
    description:
      "Inspires creativity with colorful LEGO bricks, wheels, and special pieces for endless building fun.",
    brand: "LEGO",
    category: "Toys",
    price: 59.99,
    countInStock: 35,
    rating: 4.9,
    numReviews: 30000,
  },

  // ================= GROCERY =================
  {
    name: "Kellogg's Original Corn Flakes",
    image: "https://www.quickpantry.in/cdn/shop/files/Kelloggs_Corn_Flakes.webp?v=1737307755",
    description:
      "Classic crunchy corn flakes breakfast cereal, enriched with vitamins and minerals.",
    brand: "Kellogg's",
    category: "Grocery",
    price: 4.99,
    countInStock: 200,
    rating: 4.5,
    numReviews: 17000,
  },

  // ================= AUTOMOTIVE =================
  {
    name: "Michelin Car Tire 205/55 R16",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Qy_i6JiuMr458LksT1nUykXBFvmg2FkKFw&s",
    description:
      "High-performance radial tire with excellent grip, fuel efficiency, and long-lasting durability.",
    brand: "Michelin",
    category: "Automotive",
    price: 129.99,
    countInStock: 20,
    rating: 4.7,
    numReviews: 4600,
  }
];

const importData = async () => {
  try {
    await connectDB();

    await Product.destroy({ truncate: true, cascade: false });
    await Product.bulkCreate(products);

    console.log(`${products.length} Products Imported Successfully into MySQL!`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();