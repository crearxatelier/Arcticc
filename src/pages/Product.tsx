import { Link, useParams } from 'react-router-dom'
import { getProduct, products } from '../data/products'
import { Reveal } from '../components/Reveal'
import { useMemo, useState } from 'react'
import './Product.css'

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export function Product() {
  const { id = '' } = useParams()
  const product = getProduct(id)
  const [active, setActive] = useState(0)
  const [size, setSize] = useState('M')

  const images = useMemo(
    () => (product ? [product.images.front, product.images.back, product.images.detail] : []),
    [product],
  )

  if (!product) {
    return (
      <div className="product-missing container">
        <h1 className="display">Piece not found</h1>
        <Link to="/shop" className="btn btn-solid">
          Back to shop
        </Link>
      </div>
    )
  }

  const others = products.filter((p) => p.id !== product.id)

  return (
    <div className="product-page">
      <section className="product-main container">
        <div className="product-gallery">
          <div className="product-gallery__main">
            <img src={images[active]} alt={`${product.name} view ${active + 1}`} />
          </div>
          <div className="product-gallery__thumbs">
            {images.map((src, index) => (
              <button
                key={src}
                className={active === index ? 'is-active' : ''}
                onClick={() => setActive(index)}
                aria-label={`Show image ${index + 1}`}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="product-info">
          <p className="eyebrow">
            {product.number} · {product.subtitle}
          </p>
          <h1>{product.name}</h1>
          <p className="serif-italic product-info__meaning">{product.meaningTitle}</p>
          <p className="product-info__price">CA${product.price.toFixed(2)}</p>
          <p className="product-info__desc">{product.description}</p>

          <div className="product-sizes">
            <span>Select size</span>
            <div>
              {sizes.map((s) => (
                <button
                  key={s}
                  className={size === s ? 'is-active' : ''}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-solid product-info__cta">Add to bag — {size}</button>
          <p className="product-info__sku">SKU {product.sku} · 480 GSM · Unisex oversized</p>
        </div>
      </section>

      <section className="product-story">
        <div className="container product-story__grid">
          <Reveal>
            <p className="eyebrow">In the archive</p>
            <h2 className="display">
              Built to hold
              <br />
              <span className="serif-italic">a northern moment</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p>
              Every ARCTICC hoodie features intentional branding, a story on the back, and a
              heavyweight hand-feel designed for Canadian climates. {product.name} continues that
              archive — quiet strength, lasting comfort, and a silhouette made for everyday
              northern life.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="product-more container">
        <Reveal>
          <p className="eyebrow">Continue the chapter</p>
          <h2 className="display">More from Collection I</h2>
        </Reveal>
        <div className="product-more__grid">
          {others.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <Link to={`/products/${item.id}`} className="product-more__card">
                <img src={item.images.front} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.meaningTitle}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
