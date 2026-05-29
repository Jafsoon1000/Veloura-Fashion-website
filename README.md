# 👗 Jafsoon Fashion Store

A premium, full-stack e-commerce experience built for modern fashion brands. Jafsoon combines a sleek, obsidian-dark aesthetic with a robust Node.js/Express backend and a highly responsive, modern React frontend.

![Jafsoon Banner](https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200&h=400)

---

## ✨ Key Features

- **🛍️ Complete Shopping Flow**: Persistent cart management, dynamic product listings, and a multi-step Checkout experience.
- **🏷️ Promo Code System**: Admin-managed coupon codes (percentage or fixed amount) that users can apply dynamically at checkout.
- **🔍 Advanced Search & Filter**: Real-time product searching and category-based filtering.
- **💖 Wishlist System**: Users can save their favorite items for later with instant `localStorage` persistence.
- **⭐ Product Reviews & Ratings**: Rich feedback system with star ratings and customer comments.
- **📦 Order Tracking**: Personal profile page with a complete history of past purchases and delivery statuses.
- **🔐 Secure Authentication**: JWT-based email/password authentication along with social/Firebase logins and Twilio OTP phone verification.
- **🌗 Dynamic Theming**: Smooth transition between modern light and premium obsidian-dark modes.
- **📊 Admin Dashboard**: A comprehensive admin control panel to manage products, view registered users, track orders, and configure promo codes.
- **📱 Ultra-Responsive**: Hand-crafted CSS layout optimized for perfect presentation on mobile, tablet, and desktop viewports.

---

## 🚀 Tech Stack

### Frontend
- **Core**: React 18 & Vite (for lightning-fast development and optimized bundles)
- **Routing**: React Router DOM v6
- **State Management**: Zustand (Clean, boilerplate-free stores for Auth, Cart, Theme, Currency & Wishlist)
- **Charts**: Recharts (for sleek admin order analytics)

### Backend
- **Core**: Node.js & Express (ES6 Modules)
- **Database**: MongoDB & Mongoose
- **Security**: JSON Web Tokens (JWT) & bcryptjs (password hashing)
- **Integrations**: Stripe SDK (payments) & Twilio SDK (SMS OTP phone verification)

---

## 🛠️ Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (Local Community Server or Atlas URI)

---

### ⚡ Quick Start (Windows)
For Windows environments, use the automated setup script to install all dependencies at once:
1. Double-click **`setup.bat`** in the project root (or run it via terminal):
   ```cmd
   setup.bat
   ```
2. Proceed to [Backend Configuration](#1-backend-configuration) below to set up your environment variables.

---

### 📂 Manual Installation & Setup

#### 1. Backend Configuration
Navigate to the `backend` directory:
```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example` and supply your credentials:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/veloura
JWT_SECRET=your_secure_jwt_secret_here

# (Optional) Twilio for real SMS OTP. If omitted, OTPs will log to your console.
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

#### 2. Seed Database Products
Populate the database with a premium inventory of fashion clothes, dresses, outerwear, shoes, and accessories:
```bash
node scripts/seed.js
```

#### 3. Run Backend
Start the server in development mode:
```bash
npm run dev
```
The backend server runs on `http://localhost:5000`.

---

#### 4. Frontend Configuration
Navigate to the `frontend` directory:
```bash
cd ../frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```
Open `http://localhost:5173` (or the port specified by Vite) in your browser.

---

### 🛡️ Creating an Admin User
To access the secure **Admin Dashboard**, you need an admin account:
1. Register a regular account on the website (e.g., using email `test@example.com`).
2. Open `backend/scripts/promoteAdmin.js` and ensure the email matches your registered account.
3. In the `backend` folder, run the promotion script:
   ```bash
   node scripts/promoteAdmin.js
   ```
4. Log back in on the frontend to access your new admin permissions!

---

## 📂 Project Structure

```text
├── backend
│   ├── config          # Database connection details
│   ├── controllers     # Business logic & route handlers
│   ├── middleware      # Auth protection & role-based access validation
│   ├── models          # Mongoose Schemas (User, Product, Order, Coupon)
│   ├── routes          # Express router endpoint definitions
│   ├── scripts         # Database seeding and admin promotion utilities
│   ├── utils           # Twilio SMS helpers and general utilities
│   └── server.js       # Main server entry point
├── frontend
│   ├── src
│   │   ├── components  # Reusable UI elements (Navbar, Footer, Newsletter, etc.)
│   │   ├── store       # Global Zustand stores (Auth, Cart, Currency, Theme, Wishlist)
│   │   ├── pages       # Categorized application views
│   │   │   ├── Admin   # Admin control panel, product & order dashboards
│   │   │   ├── Auth    # Login, Register, Phone Verification, Profile views
│   │   │   ├── Shop    # Catalog, Product Details, Cart, Checkout, OrderSuccess
│   │   │   └── Static  # Home, About, Contact, Blog, NotFound
│   │   ├── utils       # Axios instance & local configuration helpers
│   │   ├── App.jsx     # Route mappings & application shell
│   │   └── styles.css  # Unified design system & custom CSS properties
│   └── package.json
├── refactor.mjs        # Internal folder-restructuring automation script
├── setup.bat           # Automated environment installer script
└── README.md           # Project Documentation
```

---

## 📡 REST API Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/register` | Register a new user | Public |
| **POST** | `/login` | Authenticate user & retrieve JWT token | Public |
| **POST** | `/social` | Authenticate / register via Firebase Social Login | Public |
| **POST** | `/send-otp` | Request a Twilio SMS verification code | Public |
| **POST** | `/verify-phone` | Verify phone number with received OTP | Public |
| **GET** | `/me` | Retrieve profile information of current logged-in user | Protected |

### 🛍️ Products (`/api/products`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Fetch all products (supports query search & categories) | Public |
| **GET** | `/:id` | Fetch product details by ID | Public |
| **GET** | `/:id/related` | Fetch a list of recommended matching items | Public |
| **POST** | `/:id/reviews` | Add customer rating and text review to a product | Protected |

### 🏷️ Coupons & Promos (`/api/coupons`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/` | Create a new promotional discount code | Admin |
| **GET** | `/` | Fetch list of active promo codes | Admin |
| **DELETE** | `/:id` | Terminate/delete an existing promo code | Admin |
| **POST** | `/validate` | Check and calculate discount for a applied code | Public |

### 💳 Payments (`/api/payments`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/create-session` | Initialize a secure Stripe Checkout payment session | Protected |
| **POST** | `/verify-session` | Validate payment success status post-transaction | Public |

### 📦 Orders (`/api/orders`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/` | Save a new order to the database | Protected |
| **GET** | `/` | Fetch all site orders for management | Admin |
| **GET** | `/myorders` | Retrieve list of orders placed by current user | Protected |
| **GET** | `/:id` | Retrieve detailed breakdown of an order by ID | Protected |
| **PUT** | `/:id/deliver` | Mark order delivery status as Delivered | Admin |

### 👥 Users (`/api/users`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Fetch a directory of all registered customers | Admin |

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more details.
