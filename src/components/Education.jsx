import { useLanguage } from '../hooks/useLanguage'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Education() {
  const { t } = useLanguage()
  const [ref1, isVisible1] = useScrollReveal()
  const [ref2, isVisible2] = useScrollReveal()
  const [ref3, isVisible3] = useScrollReveal()

  return (
    <section className="section" id="education">
      <div className="container">
        <div ref={ref1} className={`section__header reveal ${isVisible1 ? 'active' : ''}`}>
          <h2 className="section__title">{t('edu.title')}</h2>
        </div>
        <div className="education__grid">
          <div ref={ref2} className={`glass-card education-card reveal ${isVisible2 ? 'active' : ''}`}>
            <div className="education-card__icon">🎓</div>
            <div className="education-card__degree">{t('edu.bsc')}</div>
            <div className="education-card__school">{t('edu.the')}</div>
            <div className="education-card__date">2024 — Present</div>
          </div>
          <div ref={ref3} className={`glass-card education-card reveal ${isVisible3 ? 'active' : ''}`}>
            <div className="education-card__icon">🚀</div>
            <div className="education-card__degree">{t('edu.cc')}</div>
            <div className="education-card__school">Codecool</div>
            <div className="education-card__date">2022 — 2023</div>
          </div>
        </div>
      </div>
    </section>
  )
}
