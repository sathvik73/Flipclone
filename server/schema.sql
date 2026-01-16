-- Database Schema for Flipkart Clone

CREATE DATABASE IF NOT EXISTS flipkart_clone;
USE flipkart_clone;

-- Users table (Simplified, assume single user or basic check)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    image_url TEXT
);

-- Products
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2), -- For discount calculation
    discount_percentage INT,
    rating DECIMAL(2, 1) DEFAULT 0,
    review_count INT DEFAULT 0,
    stock INT DEFAULT 0,
    brand VARCHAR(100),
    category_id INT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Cart
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,  -- For demo, we might use a fixed user ID
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    UNIQUE KEY unique_cart_item (user_id, product_id)
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'COD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL, -- Price at time of purchase
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Seed Data (Basic)
INSERT IGNORE INTO categories (id, name, image_url) VALUES 
(1, 'Electronics', 'https://rukminim1.flixcart.com/image/200/200/kmp7ngw0/monitor/j/z/h/s2421hn-24-s2421hn-dell-original-imagfjphuywuh2a7.jpeg'),
(2, 'Fashion', 'https://rukminim1.flixcart.com/image/200/200/xif0q/shoe/7/z/r/8-white-leaf-8-urbanbox-white-original-imagvgf4cuzs2hrw.jpeg'),
(3, 'Mobiles', 'https://rukminim1.flixcart.com/image/200/200/xif0q/mobile/k/l/l/-original-imagtc5fz9spysyk.jpeg'),
(4, 'Appliances', 'https://rukminim1.flixcart.com/image/200/200/xif0q/washing-machine-new/a/u/q/-original-imagzs7tqj3x4y7v.jpeg');

INSERT IGNORE INTO users (id, name, email, password) VALUES (1, 'Demo User', 'demo@flipkart.com', 'password123');
