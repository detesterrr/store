import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.scss';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    sizes: ['S', 'M', 'L', 'XL']
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          featured: false
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка при добавлении товара');
      }

      const data = await response.json();
      console.log('Товар добавлен:', data);
      navigate('/catalog'); // Перенаправляем в каталог после успешного добавления
    } catch (err) {
      setError(err.message);
      console.error('Ошибка:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <h1>Добавить товар</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Название:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Цена:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">URL изображения:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Сохранение...' : 'СОХРАНИТЬ'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;