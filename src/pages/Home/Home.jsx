import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.scss';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const allProducts = await response.json();
        
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        const randomProducts = shuffled.slice(0, 4);
        
        setFeaturedProducts(randomProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Новая коллекция 2025</h1>
          <p>Откройте для себя последний тренд моды</p>
          <a className="shop-now" href="/catalog">КУПИТЬ СЕЙЧАС</a>
        </div>
      </section>

      <section className="featured-products">
        <div className="section-header">
          <h2>Рекомендуемые товары</h2>
          <a href="/catalog" className="view-all">Показать всё</a>
        </div>
        
        <div className="products-grid">
          {featuredProducts.length > 0 ? (
            featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-products">
              <p>Нет рекомендуемых товаров</p>
            </div>
          )}
        </div>
      </section>

      <section className="banner">
        <div className="banner-content">
          <h2>Летняя распродажа</h2>
          <p>Скидка до 50% на выбранные товары</p>
          <a className="shop-sale" href="/catalog">КУПИТЬ СЕЙЧАС</a>
        </div>
      </section>
    </div>
  );
};

export default Home;