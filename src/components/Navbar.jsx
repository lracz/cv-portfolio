import { useState, useEffect } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { lang, t, toggleLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalScroll) * 100
      setScrollProgress(currentProgress)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -60% 0px' }
    )

    document.querySelectorAll('section[id], header[id]').forEach((s) => {
      observer.observe(s)
    })

    return () => observer.disconnect()
  }, [])

  const navLinks = [
    { id: 'about', label: t('nav.about') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'contact', label: t('nav.contact') },
  ]

  const handleLinkClick = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <a href="#" className="navbar__logo">LR</a>
        
        <div className="navbar__links">
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); handleLinkClick(id) }}
              className={`navbar__link ${activeId === id ? 'active' : ''}`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="navbar__actions">
          <button className="navbar__toggle-btn" onClick={toggleLang} aria-label="Toggle language">
            <span>{lang === 'en' ? 'HU' : 'EN'}</span>
          </button>
          <ThemeToggle />
          <div className={`navbar__hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => { e.preventDefault(); handleLinkClick(id) }}
            className="mobile-nav__link"
          >
            {label}
          </a>
        ))}
      </div>
    </>
  )
}

