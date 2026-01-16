import React, { useState } from 'react';
import { Search, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?search=${searchTerm}`);
        }
    };

    return (
        <nav className="bg-flipkart-blue text-white sticky top-0 z-50 h-[64px] shadow-md">
            <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4 max-w-[1200px]">
                {/* Logo */}
                <Link to="/" className="flex flex-col items-center leading-3">
                    <span className="font-bold text-lg italic tracking-wide">Flipkart</span>
                    <span className="text-[11px] italic text-gray-200">
                        Explore <span className="text-flipkart-yellow font-bold">Plus</span>
                        <span className="text-flipkart-yellow ml-1">+</span>
                    </span>
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 max-w-[500px] relative">
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search for products, brands and more"
                            className="w-full py-2 px-4 rounded-sm text-black outline-none shadow-sm text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="absolute right-0 top-0 h-full px-3 text-flipkart-blue">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </form>

                {/* Login Button */}
                <button className="bg-white text-flipkart-blue px-8 py-1 font-semibold rounded-sm hidden md:block hover:bg-gray-100 transition shadow-sm border border-gray-200">
                    Login
                </button>

                {/* Navigation Links */}
                <div className="flex items-center gap-8 font-medium">
                    <div className="hidden md:flex items-center gap-1 cursor-pointer">
                        <span>Become a Seller</span>
                    </div>
                    <div className="hidden md:flex items-center gap-1 cursor-pointer group relative">
                        <span>More</span>
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </div>
                    <Link to="/cart" className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        <span>Cart</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
