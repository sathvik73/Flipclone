import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap, Star, Tag } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await api.get(`/products/${id}`);
            setProduct(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const addToCart = async () => {
        try {
            await api.post('/cart', {
                productId: product.id,
                quantity: 1
            });
            alert('Item added to cart!');
            navigate('/cart');
        } catch (error) {
            console.error(error);
            alert('Failed to add to cart');
        }
    };

    if (loading) return <div className="p-10 flex justify-center">Loading...</div>;
    if (!product) return <div className="p-10 flex justify-center">Product not found</div>;

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-12 gap-8 max-w-[1200px]">
                {/* Image Section */}
                <div className="md:col-span-5 flex flex-col items-center">
                    <div className="border p-4 w-full h-[400px] flex items-center justify-center relative mb-4">
                        <img
                            src={product.image_url || 'https://via.placeholder.com/400'}
                            alt={product.title}
                            className="max-h-full max-w-full object-contain"
                        />
                        <div className="absolute top-2 right-2 border rounded-full p-1.5 cursor-pointer text-gray-400 hover:text-red-500 shadow-sm bg-white">
                            <Star className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="flex gap-4 w-full">
                        <button
                            onClick={addToCart}
                            className="flex-1 bg-flipkart-yellow text-white font-bold py-4 rounded-sm shadow-md uppercase text-sm flex items-center justify-center gap-2 hover:shadow-lg"
                        >
                            <ShoppingCart className="w-5 h-5" /> Add to Cart
                        </button>
                        <button className="flex-1 bg-orange-500 text-white font-bold py-4 rounded-sm shadow-md uppercase text-sm flex items-center justify-center gap-2 hover:shadow-lg">
                            <Zap className="w-5 h-5 fill-current" /> Buy Now
                        </button>
                    </div>
                </div>

                {/* Details Section */}
                <div className="md:col-span-7">
                    <div className="text-gray-500 text-xs mb-2">Home / {product.category_id} / {product.brand}</div>
                    <h1 className="text-xl font-normal text-gray-800 mb-2">{product.title}</h1>

                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-green-700 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            {product.rating || 4.2} <Star className="w-3 h-3 fill-current" />
                        </span>
                        <span className="text-gray-500 text-sm font-medium">{product.review_count} Ratings & Reviews</span>
                    </div>

                    <div className="mb-4">
                        <span className="text-3xl font-bold">₹{Number(product.price).toLocaleString()}</span>
                        {product.original_price && (
                            <span className="text-gray-500 line-through ml-3 text-sm">₹{Number(product.original_price).toLocaleString()}</span>
                        )}
                        <span className="text-green-600 font-bold ml-3 text-sm">{product.discount_percentage}% off</span>
                    </div>

                    {/* Offers */}
                    <div className="mb-6">
                        <h4 className="font-medium text-sm mb-2">Available offers</h4>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-start gap-2 text-sm">
                                <Tag className="w-4 h-4 text-green-600 mt-0.5" />
                                <span><span className="font-bold">Bank Offer</span> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm">
                                <Tag className="w-4 h-4 text-green-600 mt-0.5" />
                                <span><span className="font-bold">Bank Offer</span> 10% off on HDFC Bank Credit Card Transactions, up to ₹1,250</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="border border-gray-100 p-4">
                        <div className="flex items-center gap-x-16 py-4 border-b border-gray-100">
                            <span className="text-gray-500 text-sm font-medium">Description</span>
                            <p className="text-sm text-gray-700">{product.description || 'No description available for this product.'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
