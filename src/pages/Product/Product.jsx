import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Product.scss';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3001/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Товар не найден');
        }
        
        const data = await response.json();
        setProduct(data);
        setSelectedSize(data.sizes?.[0] || '');
      } catch (error) {
        console.error("Error loading product:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.sizes?.length > 0 && !selectedSize) {
      alert('Пожалуйста, выберите размер');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize);
    }
    
    navigate('/cart');
  };

  const increaseQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Товар не найден</div>;

  return (
    <div className="product-page">
      <div className="product-gallery">
        <img
          src={product.image || '/images/placeholder.jpg'}
          alt={product.name}
          onError={(e) => e.target.src = '/images/placeholder.jpg'}
          loading="lazy"
        />
      </div>

      <div className="product-details">
        <div className="product-header">
          <h1>{product.name}</h1>
          <p className="price">{product.price.toFixed(2)} ₽</p>
        </div>
        
        <p className="description">{product.description}</p>

        {product.sizes?.length > 0 && (
          <div className="size-selector">
            <h3>Размер:</h3>
            <div className="size-options">
              {product.sizes.map(size => (
                <button
                  key={size}
                  type="button"
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="quantity-selector">
          <h3>Количество:</h3>
          <div className="quantity-controls">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="quantity-value">{quantity}</span>
            <button
              type="button"
              onClick={increaseQuantity}
              disabled={quantity >= 99}
            >
              +
            </button>
          </div>
        </div>

        <div className="product-actions">
          <button
            type="button"
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Добавить в корзину
          </button>
          <Link to={`/edit-product/${id}`} className="edit-product-btn">
            Редактировать
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;