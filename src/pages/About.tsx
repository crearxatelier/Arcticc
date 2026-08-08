import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import './About.css'

const pillars = [
  {
    title: 'Identity',
    heading: 'Everyday essentials with meaning',
    body: 'Our purpose is to transform clothing into a reflection of identity, connection, and experience.',
  },
  {
    title: 'Connection',
    heading: 'Rooted in the spirit of the North',
    body: 'ARCTICC draws inspiration from landscapes, traditions, and experiences that connect people across Canada and beyond.',
  },
  {
    title: 'Purpose',
    heading: 'Quietly designed, built to last',
    body: 'We believe everyday essentials can carry deeper meaning and stand the test of time.',
  },
]

export function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero__media" aria-hidden="true">
          <img src="/hero/effortless.jpg" alt="" />
          <div className="about-hero__veil" />
        </div>
        <div className="container about-hero__copy">
          <p className="eyebrow">Brand Ethos</p>
          <h1 className="display">
            Quietly designed,
            <br />
            <span className="serif-italic">built to last</span>
          </h1>
          <p>
            Born from the spirit of the North, ARCTICC draws inspiration from the landscapes,
            traditions, and experiences that connect people across Canada and beyond.
          </p>
        </div>
      </section>

      <section className="about-manifesto container">
        <Reveal>
          <p className="serif-italic">
            “We don’t just build clothing. We construct physical archives of the moments that define
            you.”
          </p>
        </Reveal>
      </section>

      <section className="about-pillars">
        <div className="container about-pillars__grid">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.06} className="about-pillar">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{pillar.title}</h2>
              <h3 className="serif-italic">{pillar.heading}</h3>
              <p>{pillar.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="about-north">
        <div className="container about-north__grid">
          <Reveal>
            <img src="/lifestyle/hero-alt.jpg" alt="ARCTICC worn in northern light" />
          </Reveal>
          <Reveal delay={0.08} className="about-north__copy">
            <p className="eyebrow">North Spirit</p>
            <h2 className="display">
              More than a
              <br />
              direction
            </h2>
            <p>
              The North represents exploration, resilience, connection, and the quiet moments that
              become lasting memories. ARCTICC was created from a simple belief: clothing should
              carry meaning.
            </p>
            <Link to="/shop" className="btn btn-solid">
              Shop Collection I
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
