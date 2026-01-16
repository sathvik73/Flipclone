const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
    console.log('Testing API Endpoints...');

    try {
        // 1. Get Products
        console.log('GET /products...');
        const products = await axios.get(`${BASE_URL}/products`);
        console.log(`✅ Success: Fetched ${products.data.length} products`);

        // 2. Get Cart
        console.log('GET /cart...');
        try {
            const cart = await axios.get(`${BASE_URL}/cart`);
            console.log(`✅ Success: Fetched cart items`);
        } catch (e) {
            console.log('❌ Cart fetch failed (Is DB running?)');
        }

    } catch (error) {
        console.error('❌ API Test Failed:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.log('Make sure the server is running on port 5000!');
        }
    }
}

testAPI();
