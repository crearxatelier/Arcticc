import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { products, faqs } from '../data/products'
import { Reveal } from '../components/Reveal'
import { useState } from 'react'
import './Home.css'

export function Home() {
  const reduce = useReducedMotion()
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__media" aria-hidden="true">
          <img src="/hero/rack.jpg" alt="" className="hero__image" />
          <div className="hero__veil" />
        </div>

        <div className="hero__content container">
          <motion.div
            className="hero__copy"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <p className="hero__brand">ARCTICC</p>
            <h1 className="display hero__title">
              A Northern
              <br />
              <span className="serif-italic">Expression</span>
            </h1>
            <p className="hero__lede">
              Quiet & intentional design inspired by the northern sky — for people who love Canada
              but want to feel like themselves.
            </p>
            <div className="hero__ctas">
              <Link to="/shop" className="btn btn-light">
                Shop Collection I
              </Link>
              <a href="#stories" className="btn btn-ghost">
                Enter the Stories
              </a>
            </div>
          </motion.div>
        </div>

        <a href="#stories" className="hero__scroll" aria-label="Scroll to stories">
          <span>Scroll</span>
        </a>
      </section>

      <section className="chapter" id="stories">
        <div className="container chapter__grid">
          <Reveal className="chapter__intro">
            <p className="eyebrow">Chapter One</p>
            <h2 className="display">
              Stories from
              <br />
              the North
            </h2>
            <p>
              Our first chapter explores four perspectives shaped by the moments, symbols, and
              traditions that define northern life.
            </p>
          </Reveal>

          <div className="chapter__list">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.06}>
                <Link to={`/products/${product.id}`} className="chapter__item">
                  <span className="chapter__num">{product.number}</span>
                  <div className="chapter__text">
                    <h3>{product.meaningTitle.replace('The Story of ', '')}</h3>
                    <p>{product.blurb}</p>
                  </div>
                  <img src={product.images.front} alt="" />
                  <span className="chapter__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="chronicles">
        <div className="container">
          <Reveal className="chronicles__head">
            <p className="eyebrow">Collection I</p>
            <h2 className="display">
              Four silhouettes.
              <br />
              <span className="serif-italic">One northern archive.</span>
            </h2>
          </Reveal>
        </div>

        <div className="product-rows">
          {products.map((product, index) => (
            <article
              key={product.id}
              className={`product-row ${index % 2 === 1 ? 'is-reverse' : ''}`}
              style={{ ['--accent' as string]: product.accent }}
            >
              <Reveal className="product-row__media">
                <img src={product.images.back} alt={`${product.name} hoodie`} />
              </Reveal>
              <Reveal className="product-row__copy" delay={0.1}>
                <span>{product.number}</span>
                <p className="product-row__sub">{product.subtitle}</p>
                <h3>{product.name}</h3>
                <p className="serif-italic product-row__meaning">{product.meaningTitle}</p>
                <p className="product-row__desc">{product.description}</p>
                <Link to={`/products/${product.id}`} className="btn btn-ghost dark">
                  View {product.name}
                </Link>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="experience">
        <div className="experience__media" aria-hidden="true">
          <video src="/video/banner-loop.mp4" autoPlay muted loop playsInline />
          <div className="experience__veil" />
        </div>
        <div className="container experience__content">
          <Reveal>
            <p className="eyebrow">The Presentation</p>
            <h2 className="display">
              The Arcticc
              <br />
              Experience
            </h2>
            <p>
              Every order arrives in our signature magnetic box — wrapped with care, finished with
              our brand card. From first touch to final fit, every detail is intentional.
            </p>
            <Link to="/about" className="btn btn-light">
              Explore Ethos
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="vision">
        <div className="container vision__grid">
          <Reveal>
            <p className="eyebrow">Arcticc Vision</p>
            <h2 className="display">
              Beyond
              <br />
              <span className="serif-italic">the seasons</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="vision__est">Est. Canada · North Spirit</p>
            <p>
              We believe the most meaningful pieces are not defined by trends or seasons, but by the
              stories they hold. Clothing should carry meaning — physical archives of the moments
              that define you.
            </p>
            <p className="serif-italic vision__tag">Because seasons change. Stories remain.</p>
          </Reveal>
        </div>
        <div className="vision__image container">
          <Reveal>
            <img src="/lifestyle/forest.jpg" alt="Northern forest landscape with ARCTICC" />
          </Reveal>
        </div>
      </section>

      <section className="confidence">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Collection I</p>
            <h2 className="display">
              What if confidence
              <br />
              could be worn —
              <br />
              <span className="serif-italic">not just seen in the mirror?</span>
            </h2>
            <Link to="/shop" className="btn btn-solid">
              Browse the Collection
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="container faq__grid">
          <Reveal>
            <p className="eyebrow">Support & Care</p>
            <h2 className="display">
              Frequently
              <br />
              <span className="serif-italic">asked</span>
            </h2>
            <Link to="/contact" className="btn btn-ghost dark">
              Contact Support
            </Link>
          </Reveal>
          <div className="faq__list">
            {faqs.map((item, index) => (
              <Reveal key={item.q} delay={index * 0.04}>
                <button
                  className={`faq__item ${openFaq === index ? 'is-open' : ''}`}
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{item.q}</span>
                  <em aria-hidden="true">{openFaq === index ? '−' : '+'}</em>
                  <p>{item.a}</p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
