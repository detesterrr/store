import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Catalog.scss';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'http://localhost:3001/products';

        if (filter !== 'all') {
          url += `?category=${encodeURIComponent(filter)}`;
        }
        
        const response = await fetch(url);
        let data = await response.json();
        
        if (sort === 'price-low') {
          data.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high') {
          data.sort((a, b) => b.price - a.price);
        } else if (sort === 'name') {
          data.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filter, sort]);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h1>Вся коллекция</h1>
        
        <div className="catalog-controls">
          <div className="filter-control">
            <label htmlFor="category-filter">Фильтры:</label>
            <select 
              id="category-filter" 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Все категории</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="sort-control">
            <label htmlFor="sort">Сортировать по:</label>
            <select 
              id="sort" 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">По умолчанию</option>
              <option value="price-low">Дешевле</option>
              <option value="price-high">Дороже</option>
              <option value="name">A-Z</option>
            </select>
          </div>

          <Link to="/add-product" className="add-product-button">
            Добавить товар
          </Link>
        </div>
      </div>
      
      <div className="products-grid">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-products">
            <p>Товары в этой категории не найдены.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;