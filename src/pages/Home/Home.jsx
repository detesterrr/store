import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.scss';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products?_limit=4');
        const data = await response.json();
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Новая коллекция 2025</h1>
          <p>Откройте для себя последний тренд моды</p>
          <button className="shop-now">Купить сейчас</button>
        </div>
      </section>

      <section className="featured-products">
        <div className="section-header">
          <h2>Featured Products</h2>
          <a href="/catalog" className="view-all">View All</a>
        </div>
        
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="banner">
        <div className="banner-content">
          <h2>Summer Sale</h2>
          <p>Up to 50% off selected items</p>
          <button className="shop-sale">Shop Sale</button>
        </div>
      </section>
    </div>
  );
};

export default Home;