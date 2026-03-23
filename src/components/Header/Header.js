import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const { items } = useSelector((state) => state.cart);
    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-left">
                    <Link to="/" className="logo">
                        <h1>ShopHub</h1>
                    </Link>
                </div>

                <div className="header-right">
                    <Link to="/cart" className="cart-icon-container">
                        <div className="cart-icon">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </div>
                        {cartCount > 0 && (
                            <span className="cart-badge">{cartCount}</span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
