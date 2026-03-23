import { useEffect } from "react";
import { fetchProducts} from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
// import './ProductCard.css';
import './Product.css';

const Products = () => {

    const dispatch = useDispatch();
    const {items, loading, error} = useSelector((state) => state.products)
    useEffect(() =>{
        // const fetchproducts = async() => {
        //     const response = await fetch('https://fakestoreapi.com/products');
        //     const data = await response.json();
        //     dispatch(setProducts(data));
        //     dispatch(setLoading(false));
        // }

        // fetchproducts();
        dispatch(fetchProducts());
    },[dispatch])
    
    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Error: {error}</p>
    }

    return (
        <div className="products-container">
            {/* <h1 className="products-title">E-Commerce Products</h1> */}
            <div className="products-grid">
                {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Products;