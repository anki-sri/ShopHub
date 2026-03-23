import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import { addToCart } from '../../redux/slices/cartSlice';
import { useEffect, useState } from 'react';
import { fetchProductById } from '../../redux/slices/productSlice';


const ProductDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [currentProduct, setCurrentProduct] = useState(null);

    const { items } = useSelector((state) => state.products);

    useEffect(() => {
       if(!items.length) {
         dispatch(fetchProductById(id)).then((res) => {
            if(res.payload) {
                setCurrentProduct(res.payload);
            }
        });
       }
    }, [dispatch, id, items.length]);

    // const { items: cartItems } = useSelector((state) => state.cart);

    const [quantity, setQuantity] = useState(1);
    
    const product = currentProduct || items.find((item) => item.id === parseInt(id));

    const handleAddToCart = (product) => {
        dispatch(addToCart({product, quantity}));
        navigate('/cart');
    }

    if (!product) {
        return <p>Product not found</p>
    }

    return (
        <div className="product-details-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="product-details-wrapper">
                <div className="product-image-section">
                    <img src={product.image} alt={product.title}/>
                </div>

                <div className="product-info-section">
                    <p className="product-details-category">Category: {product.category}</p>
                    <h1 className="product-details-title">{product.title}</h1>
                    
                    <div className="product-rating">
                        <span className="product-rating-stars">★★★★★</span>
                        <span className="product-rating-count">(Based on reviews)</span>
                    </div>

                    <h3 className="product-details-price">${product.price.toFixed(2)}</h3>

                    <p className="product-details-description">{product.description}</p>

                    <div className="product-actions">
                        <div className="quantity-selector">
                            <button className='quantity-btn' onClick={() => setQuantity( Math.max(1, quantity - 1))}>-</button>
                            <input 
                                type="number" 
                                className="quantity-input" 
                                value={quantity} 
                                onChange={(e)=> setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                min="1"
                            />
                            <button className='quantity-btn' onClick={() => setQuantity(quantity + 1)}>+</button>
           
                        </div>
                        <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}> 
                            Add to Cart
                        </button>
                    </div>

                    <div className="product-specs">
                        <h4 className="specs-title">Product Details</h4>
                        <ul className="specs-list">
                            <li><strong>Category:</strong> {product.category}</li>
                            <li><strong>Price:</strong> ${product.price.toFixed(2)}</li>
                            <li><strong>Availability:</strong> In Stock</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;