import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.scss';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  const handleSave = () => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }).then(() => navigate('/'));
  };

  if (!product) return <div>Загрузка...</div>;

  return (
    <div className="edit-product">
      <h1>Редактировать товар</h1>
      <input 
        value={product.name} 
        onChange={(e) => setProduct({...product, name: e.target.value})} 
      />
      {/* Остальные поля */}
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default EditProduct;