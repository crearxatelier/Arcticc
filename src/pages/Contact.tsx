import { useState, type FormEvent } from 'react'
import { Reveal } from '../components/Reveal'
import './Contact.css'

export function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="contact-page">
      <section className="contact-hero container">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="display">
            Drop us
            <br />
            <span className="serif-italic">a line</span>
          </h1>
          <p>
            Have a question about order tracking, sizing, or general inquiries? We read every
            message.
          </p>
        </Reveal>
      </section>

      <section className="contact-grid container">
        <Reveal>
          <form className="contact-form" onSubmit={onSubmit}>
            <label>
              Name
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" name="email" required placeholder="you@email.com" />
            </label>
            <label>
              Message
              <textarea name="message" required rows={6} placeholder="How can we help?" />
            </label>
            <button className="btn btn-solid" type="submit">
              {sent ? 'Message sent' : 'Send message'}
            </button>
            {sent && <p className="contact-form__note">Thanks — we’ll get back to you soon.</p>}
          </form>
        </Reveal>

        <Reveal delay={0.08} className="contact-aside">
          <div>
            <h2>Studio</h2>
            <p>Montreal · Ontario, Canada</p>
          </div>
          <div>
            <h2>Email</h2>
            <a href="mailto:hello@arcticc.co">hello@arcticc.co</a>
          </div>
          <div>
            <h2>Social</h2>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
          <div>
            <h2>Support</h2>
            <p>Free shipping across Canada &amp; the US. Returns within 14 days on eligible items.</p>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
