import { Link } from 'react-router-dom'
import './Footer.css'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <img src="/brand/logo-mark.png" alt="" />
          <strong>ARCTICC</strong>
          <p>A northern expression. Designed and worn in Canada.</p>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Collection I</h3>
          <ul>
            <li>
              <Link to="/products/ursine">Ursine</Link>
            </li>
            <li>
              <Link to="/products/clutch">Clutch</Link>
            </li>
            <li>
              <Link to="/products/polaris">Polaris</Link>
            </li>
            <li>
              <Link to="/products/campcode">Campcode</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Care</h3>
          <ul>
            <li>Free shipping across Canada &amp; the US</li>
            <li>14-day easy returns</li>
            <li>
              <a href="mailto:hello@arcticc.co">hello@arcticc.co</a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>All rights reserved · ARCTICC © 2026</span>
        <span>Montreal · Ontario · North Spirit</span>
      </div>
    </footer>
  )
}
