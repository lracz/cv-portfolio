import { useState, useEffect } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Hero() {
  const { t } = useLanguage()
  const [ref, isVisible] = useScrollReveal()
  const [typedRole, setTypedRole] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // ?nohero=1 param handling
  const isNoHero = new URLSearchParams(window.location.search).get('nohero') === '1'
  useEffect(() => {
    if (isNoHero) document.body.classList.add('no-hero')
    return () => document.body.classList.remove('no-hero')
  }, [isNoHero])

  useEffect(() => {
    const roles = t('hero.roles') || []
    if (roles.length === 0) return

    const currentRole = roles[roleIndex]
    
    let timeout
    if (!isDeleting) {
      if (typedRole.length < currentRole.length) {
        timeout = setTimeout(() => {
          setTypedRole(currentRole.substring(0, typedRole.length + 1))
        }, 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (typedRole.length > 0) {
        timeout = setTimeout(() => {
          setTypedRole(currentRole.substring(0, typedRole.length - 1))
        }, 40)
      } else {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }
    }
    
    return () => clearTimeout(timeout)
  }, [typedRole, isDeleting, roleIndex, t])

  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <div className="hero__gradient-orb hero__gradient-orb--1"></div>
        <div className="hero__gradient-orb hero__gradient-orb--2"></div>
        <div className="hero__gradient-orb hero__gradient-orb--3"></div>
      </div>
      <div className="hero__content">
        <div className="hero__text">
          <p className="hero__greeting">{t('hero.greeting')}</p>
          <h1 className="hero__name">László Rácz</h1>
          <div className="hero__roles">
            <span className="hero__role-text">{typedRole}</span><span className="hero__cursor"></span>
          </div>
          <p className="hero__description">{t('hero.desc')}</p>
          <div className="hero__cta">
            <a href="#projects" className="btn btn--primary">{t('hero.cta1')}</a>
            <a href="/cv.pdf" className="btn btn--outline" download="Racz_Laszlo_CV.pdf">{t('hero.cta2')}</a>
            <a href="#contact" className="btn btn--accent hero__internship-btn">{t('hero.cta3')}</a>
          </div>

          <div className="hero__socials">
            <a href="https://github.com/lracz" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="mailto:lasracz@gmail.com" className="social-link" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 4 10 8 10-8"/></svg>
            </a>
          </div>
        </div>
        <div ref={ref} className={`hero__photo-wrapper reveal-scale ${isVisible ? 'active' : ''}`}>
          <div className="hero__photo-ring">
            <img src="/profile.jpg" alt="László Rácz" className="hero__photo" />
          </div>
        </div>


      </div>
    </section>
  )
}
