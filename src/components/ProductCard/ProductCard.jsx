import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductCard.scss';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => e.target.src = '/images/placeholder.jpg'}
          className="product-image"
        />
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="price">{product.price.toFixed(2)} ₽</p>
        </div>
      </Link>
      <button
        className="add-to-cart-btn"
        onClick={() => addToCart(product, product.sizes?.[0])}
      >
        В корзину
      </button>
    </div>
  );
};

export default ProductCard;