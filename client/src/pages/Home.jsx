```
import React, { useEffect, useState } from 'react';
import api from '../api';
import { useSearchParams, Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search');
    const category = searchParams.get('category');

    useEffect(() => {
        fetchProducts();
    }, [searchTerm, category]);

    const fetchProducts = async () => {
        try {
            let url = '/products';
            const params = new URLSearchParams();
            if (searchTerm) params.append('search', searchTerm);
            if (category) params.append('category', category);

            if (params.toString()) url += `? ${ params.toString() } `;

            const response = await api.get(url);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-4">
            <div className="container mx-auto px-2 max-w-[1400px]">
                {/* Categories Bar (Static for demo) */}
                <div className="bg-white p-3 mb-4 shadow rounded-sm hidden md:flex justify-between items-center text-sm font-medium text-gray-700">
                    {['Mobiles', 'Fashion', 'Electronics', 'Home', 'Travel', 'Beauty', 'Toys'].map((cat) => (
                        <div key={cat} className="flex flex-col items-center cursor-pointer hover:text-flipkart-blue">
                            {/* Placeholder icons */}
                            <div className="w-16 h-16 bg-gray-200 rounded-full mb-1"></div>
                            <span>{cat}</span>
                        </div>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="bg-white p-4 shadow rounded-sm">
                    <h2 className="text-xl font-medium mb-4">{searchTerm ? `Results for "${searchTerm}"` : 'Recommended for You'}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {products.map(product => (
                            <Link to={`/ product / ${ product.id }`} key={product.id} className="group hover:shadow-lg transition p-4 border rounded-sm border-gray-100 flex flex-col items-center">
                                <div className="h-48 w-full flex items-center justify-center mb-4 relative">
                                    <img src={product.image_url || 'https://via.placeholder.com/200'} alt={product.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" />
                                </div>
                                <div className="self-start w-full">
                                    <h3 className="text-sm text-gray-500 font-medium mb-1 truncate">{product.brand}</h3>
                                    <h3 className="font-medium text-gray-900 truncate mb-1 hover:text-flipkart-blue cursor-pointer" title={product.title}>{product.title}</h3>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="bg-green-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                            {product.rating || 4.2} ★
                                        </span>
                                        <span className="text-gray-500 text-sm">({product.review_count || 123})</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-lg">₹{Number(product.price).toLocaleString()}</span>
                                        {product.original_price && (
                                            <>
                                                <span className="text-gray-500 line-through text-sm">₹{Number(product.original_price).toLocaleString()}</span>
                                                <span className="text-green-600 text-sm font-medium">{product.discount_percentage}% off</span>
                                            </>
                                        )}
                                    </div>
                                    <span className="text-[12px] text-gray-500 font-medium hidden group-hover:block mt-1">Free delivery</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
