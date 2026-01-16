import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState({
        name: '',
        mobile: '',
        pincode: '',
        locality: '',
        address: '',
        city: '',
        state: ''
    });
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullAddress = `${address.name}, ${address.mobile}, ${address.address}, ${address.locality}, ${address.city}, ${address.state} - ${address.pincode}`;

        try {
            const response = await api.post('/orders', {
                shippingAddress: fullAddress,
                paymentMethod: 'COD'
            });
            setOrderPlaced(true);
            setOrderId(response.data.orderId);
        } catch (error) {
            console.error(error);
            alert('Failed to place order');
        }
    };

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-green-600 text-2xl">✓</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
                    <p className="text-gray-600 mb-6">Your order ID is: <span className="font-bold">#{orderId}</span></p>
                    <button onClick={() => navigate('/')} className="bg-flipkart-blue text-white px-6 py-2 rounded font-medium shadow-sm hover:bg-blue-600 transition">
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="container mx-auto px-4 max-w-[800px]">
                <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-sm p-6">
                    <h2 className="text-lg font-medium bg-flipkart-blue text-white p-3 -mx-6 -mt-6 mb-6">DELIVERY ADDRESS</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required name="name" placeholder="Name" onChange={handleChange} className="border p-2 rounded-sm outline-none focus:border-flipkart-blue" />
                        <input required name="mobile" placeholder="10-digit mobile number" onChange={handleChange} className="border p-2 rounded-sm outline-none focus:border-flipkart-blue" />
                        <input required name="pincode" placeholder="Pincode" onChange={handleChange} className="border p-2 rounded-sm outline-none focus:border-flipkart-blue" />
                        <input required name="locality" placeholder="Locality" onChange={handleChange} className="border p-2 rounded-sm outline-none focus:border-flipkart-blue" />
                        <textarea required name="address" placeholder="Address (Area and Street)" onChange={handleChange} className="border p-2 rounded-sm outline-none focus:border-flipkart-blue md:col-span-2 rows-3"></textarea>
                        <input required name="city" placeholder="City/District/Town" onChange={handleChange} className="border p-2 rounded-sm outline-none focus:border-flipkart-blue" />
                        <input required name="state" placeholder="State" onChange={handleChange} className="border p-2 rounded-sm outline-none focus:border-flipkart-blue" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button type="submit" className="bg-orange-500 text-white font-bold py-3 px-8 rounded-sm shadow-sm hover:shadow-md uppercase text-sm">
                            Deliver Here
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
