import { useLanguage } from '../hooks/useLanguage'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function About() {
  const { t } = useLanguage()
  const [ref1, isVisible1] = useScrollReveal()
  const [ref2, isVisible2] = useScrollReveal()
  const [ref3, isVisible3] = useScrollReveal()

  return (
    <section className="section" id="about">
      <div className="container">
        <div ref={ref1} className={`section__header reveal ${isVisible1 ? 'active' : ''}`}>
          <h2 className="section__title">{t('about.title')}</h2>
        </div>
        <div className="about__content">
          <div ref={ref2} className={`about__bio reveal-left ${isVisible2 ? 'active' : ''}`}>
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </div>
          <div ref={ref3} className={`about__stats reveal-right ${isVisible3 ? 'active' : ''}`}>
            <div className="glass-card stat-card"><div className="stat-card__number">17+</div><div className="stat-card__label">{t('about.stat1')}</div></div>
            <div className="glass-card stat-card"><div className="stat-card__number">7+</div><div className="stat-card__label">{t('about.stat2')}</div></div>
            <div className="glass-card stat-card"><div className="stat-card__number">1 yr</div><div className="stat-card__label">{t('about.stat3')}</div></div>
            <div className="glass-card stat-card"><div className="stat-card__number">3</div><div className="stat-card__label">{t('about.stat4')}</div></div>
          </div>
        </div>
      </div>
    </section>
  )
}
