import { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Contact() {
  const { t } = useLanguage()
  const [ref1, isVisible1] = useScrollReveal()
  const [ref2, isVisible2] = useScrollReveal()
  const [ref3, isVisible3] = useScrollReveal()

  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    try {
      const res = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { 'Accept': 'application/json' }
      })
      if (res.ok) {
        setStatus('success')
        e.target.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    setIsSubmitting(false)
  }

  return (
    <section className="section" id="contact" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div ref={ref1} className={`section__header reveal ${isVisible1 ? 'active' : ''}`}>
          <h2 className="section__title">{t('contact.title')}</h2>
          <p className="section__subtitle">{t('contact.sub')}</p>
        </div>
        <div className="contact__content">
          <div ref={ref2} className={`contact__info reveal-left ${isVisible2 ? 'active' : ''}`}>
            <div className="glass-card contact__info-card">
              <div className="contact__info-icon">📧</div>
              <div><div className="contact__info-label">Email</div><div className="contact__info-value">lasracz@gmail.com</div></div>
            </div>
            <div className="glass-card contact__info-card">
              <div className="contact__info-icon">📱</div>
              <div><div className="contact__info-label">{t('contact.phone')}</div><div className="contact__info-value">+36 70 673 8713</div></div>
            </div>
            <div className="glass-card contact__info-card">
              <div className="contact__info-icon">💻</div>
              <div><div className="contact__info-label">GitHub</div><div className="contact__info-value"><a href="https://github.com/lracz" target="_blank" rel="noreferrer">github.com/lracz</a></div></div>
            </div>
            <div className="glass-card contact__info-card">
              <div className="contact__info-icon">🌍</div>
              <div><div className="contact__info-label">{t('contact.langs')}</div><div className="contact__info-value">{t('contact.langvals')}</div></div>
            </div>
          </div>
          
          <form ref={ref3} className={`contact-form reveal-right ${isVisible3 ? 'active' : ''}`} onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-group__input" name="name" id="formName" placeholder=" " required />
              <label htmlFor="formName" className="form-group__label">{t('contact.name')}</label>
            </div>
            <div className="form-group">
              <input type="email" className="form-group__input" name="email" id="formEmail" placeholder=" " required />
              <label htmlFor="formEmail" className="form-group__label">Email</label>
            </div>
            <div className="form-group">
              <textarea className="form-group__textarea" name="message" id="formMessage" placeholder=" " required></textarea>
              <label htmlFor="formMessage" className="form-group__label">{t('contact.msg')}</label>
            </div>
            <button type="submit" className="btn btn--primary form-submit" disabled={isSubmitting}>
              {isSubmitting ? t('form.sending') : t('contact.send')}
            </button>
            {status === 'success' && <div className="form-status success">{t('form.success')}</div>}
            {status === 'error' && <div className="form-status error">{t('form.error')}</div>}
          </form>
        </div>
      </div>
    </section>
  )
}
