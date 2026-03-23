import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({product}) => {
    const navigate = useNavigate();
    return (
        <div className="product-card">
            <div className="product-image">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.title}
                    />
                ) : (
                    'No Image'
                )}
            </div>
            <h2 className="product-title">
                {product.title}
            </h2>
            <p className="product-price">
                ${product.price.toFixed(2)}
            </p>
            <button className="details-button"
            onClick={() => navigate(`/product/${product.id}`)}>
                View Details
            </button>
        </div>
    )
}

export default ProductCard;