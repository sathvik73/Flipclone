# Flipkart Clone (MERN Stack)

A full-stack e-commerce application replicating Flipkart's core functionality and design.

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Lucide Icons, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MySQL.

## Features
- **Home Page**: Product listing with categories, search, filter, and carousel layout.
- **Product Details**: Image view, specifications, price details, Add to Cart / Buy Now.
- **Cart**: Manage quantities, remove items, view price breakdown.
- **Checkout**: Shipping address form and order placement.
- **Order Confirmation**: Success screen with Order ID.

## 🚀 Deployment Guide (Vercel + Online MySQL)

### 1. Get a Free MySQL Database
1. Sign up on **[Aiven.io](https://aiven.io/)**, **[Railway.app](https://railway.app/)**, or **[Clever Cloud](https://www.clever-cloud.com/)**.
2. Create a new **MySQL** service.
3. Copy the **Service URI** (Connection String). It looks liks:
   `mysql://user:password@host:port/defaultdb?ssl-mode=REQUIRED`

### 2. Prepare Codebase
Ensure you have the latest code handling `DATABASE_URL` and `VITE_API_URL`.

### 3. Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel` (or use Vercel Dashboard).
2. Run `vercel` in the project root.
3. Follow the prompts (Link to existing project? No. Project Name? [Enter]. Directory? [Enter]).
4. **Environment Variables**:
   - Go to Vercel Dashboard -> Settings -> Environment Variables.
   - Add `DATABASE_URL`: Paste your MySQL Connection String.
   - Add `VITE_API_URL`: Set to `/api` (this routes requests to the backend function).

### 4. Seed the Database
Since you can't run `seed.js` easily on Vercel's serverless environment directly, run it locally connecting to the remote DB:
1. In your local terminal (`server` folder), set the env var temporarily:
   - **Windows (PowerShell)**: `$env:DATABASE_URL="mysql://..."`; `node seed.js`
   - **Mac/Linux**: `DATABASE_URL="mysql://..." node seed.js`
2. This will create tables and data in your online database.

## Local Development Setup

### Prerequisites
- Node.js (v14+)
- MySQL Server

### 1. Database Setup
1. Create a MySQL database named `flipkart_clone`.
2. Update `server/.env` with your MySQL credentials:
   ```env
   DB_PASSWORD=your_password
   ```
3. Run the seed script:
   ```bash
   cd server
   node seed.js
   ```

### 2. Run Application
- **Backend**: `cd server && npm start` (Runs on port 5000)
- **Frontend**: `cd client && npm run dev` (Runs on port 5173)

## Usage
1. Open the frontend URL.
2. Browse products.
3. Add items to cart.
4. Go to Cart -> Place Order.
5. Enter address -> Confirm.
