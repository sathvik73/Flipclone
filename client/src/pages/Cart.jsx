import api from '../api';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await api.get('/cart');
            setCartItems(response.data.items);
            setTotalAmount(response.data.totalAmount);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const updateQuantity = async (id, newQty) => {
        if (newQty < 1) return;
        try {
            await api.put(`/cart/${id}`, { quantity: newQty });
            fetchCart();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeItem = async (id) => {
        try {
            await api.delete(`/cart/${id}`);
            fetchCart();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const placeOrder = () => {
        if (cartItems.length === 0) return;
        navigate('/checkout');
    };

    if (cartItems.length === 0) return (
        <div className="min-h-[500px] flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-sm text-center">
                <img src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Cart" className="h-40 mx-auto mb-4" />
                <h2 className="text-lg font-medium mb-2">Your cart is empty!</h2>
                <p className="text-sm text-gray-500 mb-6">Add items to it now.</p>
                <button onClick={() => navigate('/')} className="bg-flipkart-blue text-white px-10 py-2 rounded-sm font-medium shadow-sm">Shop Now</button>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-100 min-h-screen py-4">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-[1200px]">
                {/* Cart Items */}
                <div className="lg:col-span-2 bg-white shadow-sm rounded-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
                        <h2 className="font-medium text-lg">My Cart ({cartItems.length})</h2>
                    </div>

                    {cartItems.map(item => (
                        <div key={item.cart_item_id} className="p-6 border-b border-gray-100 flex gap-6">
                            <div className="flex flex-col items-center gap-4">
                                <img src={item.image_url || 'https://via.placeholder.com/150'} alt={item.title} className="h-24 w-24 object-contain" />
                                <div className="flex items-center gap-2">
                                    <button
                                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 font-medium hover:bg-gray-50"
                                        onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}
                                    > - </button>
                                    <input type="text" value={item.quantity} readOnly className="w-10 text-center border border-gray-300 h-7 text-sm mx-1 outline-none" />
                                    <button
                                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 font-medium hover:bg-gray-50"
                                        onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
                                    > + </button>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-800 hover:text-flipkart-blue cursor-pointer mb-1 line-clamp-2">{item.title}</h3>
                                <div className="text-xs text-gray-500 mb-3 capitalize">{item.brand}</div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-gray-400 line-through text-sm">₹{Number(item.original_price || item.price * 1.2).toLocaleString()}</span>
                                    <span className="font-bold text-lg">₹{Number(item.price).toLocaleString()}</span>
                                    <span className="text-green-600 text-sm font-bold">{item.discount_percentage || '20'}% Off</span>
                                </div>
                                <button
                                    onClick={() => removeItem(item.cart_item_id)}
                                    className="font-medium text-gray-800 hover:text-flipkart-blue uppercase text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="p-4 bg-white sticky bottom-0 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-end">
                        <button
                            onClick={placeOrder}
                            className="bg-orange-500 text-white font-medium px-12 py-3.5 rounded-sm shadow-md uppercase text-base hover:shadow-lg"
                        >
                            Place Order
                        </button>
                    </div>
                </div>

                {/* Price Summary */}
                <div className="lg:col-span-1 h-fit">
                    <div className="bg-white shadow-sm rounded-sm">
                        <div className="p-4 border-b border-gray-100">
                            <h3 className="text-gray-500 font-bold uppercase text-sm">Price Details</h3>
                        </div>
                        <div className="p-4 flex flex-col gap-4">
                            <div className="flex justify-between text-gray-700">
                                <span>Price ({cartItems.length} items)</span>
                                <span>₹{totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Discount</span>
                                <span className="text-green-600">− ₹0</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Delivery Charges</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="border-t border-dashed my-2"></div>
                            <div className="flex justify-between font-bold text-lg text-gray-800">
                                <span>Total Amount</span>
                                <span>₹{totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-100 text-green-600 font-medium text-sm">
                            You will save ₹0 on this order
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
