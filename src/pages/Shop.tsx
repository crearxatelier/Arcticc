import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { Reveal } from '../components/Reveal'
import './Shop.css'

export function Shop() {
  return (
    <div className="shop-page">
      <section className="shop-hero">
        <div className="container">
          <p className="eyebrow">Collection I</p>
          <h1 className="display">
            Designed
            <br />
            <span className="serif-italic">artifacts</span>
          </h1>
          <p>Four hoodies. Four northern stories. Built for lasting comfort.</p>
        </div>
      </section>

      <section className="shop-grid container">
        {products.map((product, index) => (
          <Reveal key={product.id} delay={index * 0.05}>
            <Link to={`/products/${product.id}`} className="shop-card">
              <div className="shop-card__media">
                <img src={product.images.front} alt={`${product.name} hoodie`} />
              </div>
              <div className="shop-card__meta">
                <span>{product.number}</span>
                <h2>{product.name}</h2>
                <p>{product.meaningTitle}</p>
                <strong>CA${product.price.toFixed(2)}</strong>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
    </div>
  )
}
