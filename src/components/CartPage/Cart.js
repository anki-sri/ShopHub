import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);

    const [showToast, setShowToast] = useState(true);

    useEffect(() => {
        setTimeout(() =>{
            setShowToast(false);
        }, 2000)

        return () => clearTimeout();
    }, [showToast])

    useEffect(() => {
        if(items.length > 0){
            localStorage.setItem('cartItems', JSON.stringify(items))
        }else{
            const storedItems = localStorage.getItem('cartItems');
            if(storedItems) {
                const parsedItems = JSON.parse(storedItems);
                parsedItems.forEach((parsedItem) => {
                    dispatch(addToCart({ product: parsedItem, quantity: parsedItem.quantity }));
                });
            }
        }
    }, [items, dispatch])

    const handleRemove = (itemId) => {
        dispatch(removeFromCart(itemId));
        localStorage.removeItem('cartItems');
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const calculateSubtotal = (price, quantity) => {
        return (price * quantity).toFixed(2);
    };

    if (items.length === 0) {
        return (
            <div className="cart-container">
                <div className="empty-cart">
                    <h2>Your Cart is Empty</h2>
                    <p>Start shopping to add items to your cart!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
                
            <h1>Shopping Cart</h1>
            {showToast && (
                    <div className="toast">
                        <p>Item added to cart!</p>
                    </div>
                )}
            <div className="cart-wrapper">
                <div className="cart-items-section">
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="cart-item-row">
                                    <td className="product-info">
                                        {item.image && (
                                            <img src={item.image} alt={item.name} className="item-image" />
                                        )}
                                        <div>
                                            <p className="product-name">{item.name}</p>
                                        </div>
                                    </td>
                                    <td className="product-price">
                                        ${parseFloat(item.price).toFixed(2)}
                                    </td>
                                    <td className="product-quantity">
                                        <span className="quantity-badge">{item.quantity}</span>
                                    </td>
                                    <td className="product-subtotal">
                                        ${calculateSubtotal(item.price, item.quantity)}
                                    </td>
                                    <td className="product-action">
                                        <button
                                            className="remove-btn"
                                            onClick={() => handleRemove(item.id)}
                                            title="Remove item from cart"
                                        >
                                            ✕
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="cart-summary-section">
                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        
                        <div className="summary-item">
                            <span>Subtotal:</span>
                            <span>${calculateTotal()}</span>
                        </div>
                        
                        <div className="summary-item">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        
                        <div className="summary-item tax">
                            <span>Estimated Tax:</span>
                            <span>${(parseFloat(calculateTotal()) * 0.1).toFixed(2)}</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-total">
                            <span>Total:</span>
                            <span>${(parseFloat(calculateTotal()) * 1.1).toFixed(2)}</span>
                        </div>

                        <button className="checkout-btn">Proceed to Checkout</button>
                        <button className="continue-shopping-btn" onClick={()=> navigate(`/`)}>Continue Shopping</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;