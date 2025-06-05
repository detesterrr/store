import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.scss';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div>Загрузка...</div>;

  return (
    <div className="product-details">
      <div className="images">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="info">
        <h1>{product.name}</h1>
        <p className="price">${product.price}</p>
        <p>{product.description}</p>
        
        <div className="size-selector">
          <h3>Размер:</h3>
          {product.sizes.map(size => (
            <button 
              key={size} 
              className={selectedSize === size ? 'active' : ''}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <button 
          className="add-to-cart" 
          disabled={!selectedSize}
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;