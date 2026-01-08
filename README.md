# 🛒 Amazon Clone - MERN Stack

A full-featured e-commerce platform replicating the core experience of Amazon. This project includes user authentication, dynamic product searching, category filtering, a personalized wishlist, and order history tracking.

## 🔗 Live Demo
* **Frontend:** [https://scalar-ai-assessment-yl8t.vercel.app/](https://scalar-ai-assessment-yl8t.vercel.app/)
* **Backend API:** [https://scalar-ai-assessment.vercel.app/](https://scalar-ai-assessment.vercel.app/)

---

## ✨ Features
### 🛍️ Product Experience
- Dynamic Product Grid: Responsive layout showcasing products with real-time "In Stock" indicators.
- Advanced Search & Filter: Search products by name using MongoDB $regex and filter by categories without page reloads.
- Product Details: Individual pages for each product with detailed descriptions and pricing.

### 🔐 User & Security
- JWT Authentication: Secure login and registration system using JSON Web Tokens.
- Protected Routes: Features like Checkout, Wishlist, and Order History are strictly restricted to logged-in users.
- Password Encryption: Sensitive data is hashed using bcrypt before storage.

### 💖 Shopping Utilities
- Persistent Wishlist: Add/remove items from a personal wishlist that persists across sessions.
- Cart Management: Full cart functionality including quantity adjustments and real-time total calculation.
- Simplified Order History: A clean, optimized view for users to track their past purchases and order details.

---

## 🛠️ Tech Stack
- Frontend: Built with React.js for a dynamic user interface, styled using Tailwind CSS, and utilizing React Router Dom for navigation.
- Backend: Developed using Node.js as the runtime and Express.js as the web framework to handle server-side logic and API routes.
- Database: Powered by MongoDB (Atlas), a document-oriented database used for storing product data, user profiles, and order information.
- Deployment: Hosted on Vercel, leveraging Serverless Functions to run the backend API efficiently.

---

## 🚀 Optimization & Performance
- Modular Architecture: Components like ProductCard are decoupled to ensure the same logic is used across the Home and Wishlist pages.
- Serverless Optimization: The backend is configured as a serverless function on Vercel, ensuring it scales automatically with traffic.
- CORS Configuration: Fine-tuned Cross-Origin Resource Sharing to allow secure communication between the separate frontend and backend domains.
- Search Optimization: Utilized MongoDB indexing on product names to ensure search queries remain fast as the database grows.

--- 

## 🔌 API Reference
### 1. Product APIs
- GET /api/products

        Input: Optional query parameters like keyword (for search) or category.
        Output: An array of product objects matching the criteria.
- GET /api/products/:id

        Input: Product ID in the URL.
        Output: A single product object with full details.

### 2. User & Auth APIs

-  POST /api/users/login

        Input: JSON body containing { "email": "...", "password": "..." }.
        Output: User profile data and a JWT Token for authentication.

 - POST /api/users/register

        Input: JSON body containing { "name": "...", "email": "...", "password": "..." }.
        Output: New user profile data and a JWT Token.

### 3. Wishlist APIs (Protected)

  - POST /api/wishlist/:id

        Input: Product ID in URL; Requires Bearer Token in Headers.
        Output: Updated user wishlist status (added/removed).

### 4. Order APIs (Protected)

  - POST /api/orders

        Input: JSON body with orderItems, shippingAddress, and totalPrice. Requires Bearer Token.
        Output: The created order object with a unique Order ID.

  - GET /api/orders/myorders

        Input: Requires Bearer Token in Headers.
        Output: A list of all orders placed by the logged-in user.

---

## ⚙️ Installation & Setup
- Clone the Repository:
 ```bash
git clone https://github.com/[your-username]/your-repo-name.git
```
- Environment Variables: Create a .env file in the Backend folder
 ```bash
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    NODE_ENV=production
```
- Frontend Config: Ensure your frontend environment variable VITE_API_URL points to the live backend link above.

--- 

## 📋 Assumptions Made
- Single Currency: All transactions are assumed to be in USD ($).
- Category Logic: Products belong to a predefined set of categories for consistent filtering.
- Image Hosting: Product images are served via external URLs provided in the database.
---
## 🤝 Acknowledgments

- Deployed on Vercel for high-performance frontend and serverless backend execution.
- Database hosted on MongoDB Atlas for high availability.