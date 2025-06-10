  import { useState, useEffect } from 'react';
  import { useParams, useNavigate } from 'react-router-dom';
  import { useCart } from '../../context/CartContext';
  import './ProductDetails.scss';

  const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProduct = async () => {  
        try {
          const response = await fetch(`http://localhost:3001/products/${id}`);
          const data = await response.json();
          setProduct(data);
          setSelectedSize(data.sizes?.[0] || '');
        } catch (error) {
          console.error("Ошибка загрузки товара:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
      if (!selectedSize) {
        alert('Пожалуйста, выберите размер');
        return;
      }

      const productToAdd = {
        ...product,
        size: selectedSize,
        quantity: quantity,
        addedAt: new Date().toISOString()
      };

      addToCart(productToAdd);
      
      if (window.confirm(`${product.name} добавлен в корзину. Перейти к оформлению?`)) {
        navigate('/cart');
      }
    };

    if (loading) return <div className="loading">Загрузка товара...</div>;
    if (!product) return <div className="error">Товар не найден</div>;

    return (
      <div className="product-details-container">
        <div className="product-images">
          <img 
            src={product.image} 
            alt={product.name}
            onError={(e) => {
              e.target.src = '/images/placeholder.jpg';
            }}
          />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">{product.price.toFixed(2)} ₽</p>
          <p className="description">{product.description}</p>

          {product.sizes?.length > 0 && (
            <div className="size-section">
              <h3>Выберите размер:</h3>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="quantity-section">
            <h3>Количество:</h3>
            <div className="quantity-selector">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    );
  };

  export default ProductDetails;