import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Catalog.scss';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'http://localhost:3001/products';
        
        // Apply filters if needed
        if (filter !== 'all') {
          url += `?category=${filter}`;
        }
        
        const response = await fetch(url);
        let data = await response.json();
        
        // Apply sorting
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
    return <div className="loading">Loading...</div>;
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
              <option value="tops">Верх</option>
              <option value="bottoms">Низ</option>
              <option value="dresses">Юбки</option>
              <option value="outerwear">Верхняя одежда</option>
            </select>
          </div>
          
          <div className="sort-control">
            <label htmlFor="sort">Сортировать по:</label>
            <select 
              id="sort" 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="products-grid">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-products">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;