import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Product.scss';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const data = await response.json();
        setProduct(data);
        setSelectedSize(data.sizes?.[0] || '');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    alert(`${quantity} ${product.name} размера: ${selectedSize} добавлено в корзину`);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => navigate('/catalog')}>Вернуться в каталог</button>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-gallery">
          <div className="main-image">
            <img 
              src={product.image} 
              alt={product.name} 
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x800?text=Product+Image';
              }}
            />
          </div>
        </div>
        
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          
          <div className="product-description">
            <p>{product.description}</p>
          </div>
          
          {product.sizes && product.sizes.length > 0 && (
            <div className="size-selector">
              <h3>Размер</h3>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="quantity-selector">
            <h3>Количесво</h3>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
            </div>
          </div>
          
          <button 
            className="add-to-cart-button"
            onClick={handleAddToCart}
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;