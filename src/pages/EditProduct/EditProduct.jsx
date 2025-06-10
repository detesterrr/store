import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.scss';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    sizes: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Ошибка загрузки товара:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleSizeChange = (e) => {
    const sizes = e.target.value.split(',').map(s => s.trim());
    setProduct(prev => ({ ...prev, sizes }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await fetch(`http://localhost:3001/products/${id}`, {
        method: 'DELETE'
      });

      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });

      if (response.ok) {
        alert('Товар успешно обновлен!');
        navigate(`/product/${id}`);
      }
    } catch (error) {
      console.error("Ошибка обновления товара:", error);
      alert('Произошла ошибка при обновлении товара');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      try {
        await fetch(`http://localhost:3001/products/${id}`, {
          method: 'DELETE'
        });
        alert('Товар успешно удален!');
        navigate('/catalog');
      } catch (error) {
        console.error("Ошибка удаления товара:", error);
        alert('Произошла ошибка при удалении товара');
      }
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;

  return (
    <div className="edit-product-container">
      <h1>Редактирование товара</h1>
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Название:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Цена:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Описание:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Категория:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Изображение (URL):</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Размеры (через запятую):</label>
          <input
            type="text"
            value={product.sizes.join(', ')}
            onChange={handleSizeChange}
            placeholder="S, M, L, XL"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">
            Сохранить изменения
          </button>
          <button 
            type="button" 
            className="delete-btn"
            onClick={handleDelete}
          >
            Удалить товар
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;