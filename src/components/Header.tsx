import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { products } from '../data/products'
import './Header.css'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const inverted = isHome && !scrolled && !open

  return (
    <>
      <header
        className={`site-header ${inverted ? 'is-invert' : ''} ${scrolled || open ? 'is-solid' : ''} ${open ? 'is-menu-open' : ''}`}
      >
        <div className="site-header__inner container">
          <Link to="/" className="brand" aria-label="ARCTICC home">
            <img src="/brand/logo-mark.png" alt="" className="brand__mark" />
            <span className="brand__word">ARCTICC</span>
          </Link>

          <nav className="site-nav" aria-label="Primary">
            {products.map((p) => (
              <NavLink key={p.id} to={`/products/${p.id}`} className="site-nav__link">
                {p.name}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <Link to="/shop" className="header-shop">
              Shop
            </Link>
            <button
              className={`menu-toggle ${open ? 'is-open' : ''}`}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        className={`site-menu ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <div className="site-menu__panel container">
          <nav className="site-menu__nav">
            <Link to="/shop">Our Shop</Link>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className="site-menu__products">
            {products.map((p) => (
              <Link key={p.id} to={`/products/${p.id}`} className="site-menu__product">
                <img src={p.images.front} alt="" />
                <div>
                  <span>{p.number}</span>
                  <strong>{p.name}</strong>
                  <em>{p.meaningTitle}</em>
                </div>
              </Link>
            ))}
          </div>
          <p className="site-menu__meta">Est. Canada · North Spirit</p>
        </div>
      </div>
    </>
  )
}
