import { useLanguage } from '../hooks/useLanguage'
import { useScrollReveal } from '../hooks/useScrollReveal'

function TimelineItem({ date, role, company, desc, side }) {
  const [ref, isVisible] = useScrollReveal()
  return (
    <div ref={ref} className={`timeline__item reveal-${side} ${isVisible ? 'active' : ''}`}>
      <div className="timeline__dot"></div>
      <div className="glass-card timeline__card">
        <div className="timeline__date">{date}</div>
        <div className="timeline__role">{role}</div>
        <div className="timeline__company">{company}</div>
        <p className="timeline__description">{desc}</p>
      </div>
    </div>
  )
}

export default function Experience() {
  const { t } = useLanguage()
  const [ref1, isVisible1] = useScrollReveal()

  return (
    <section className="section" id="experience" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div ref={ref1} className={`section__header reveal ${isVisible1 ? 'active' : ''}`}>
          <h2 className="section__title">{t('exp.title')}</h2>
        </div>
        <div className="timeline">
          <TimelineItem date="2024 — Present" role={t('exp.r1')} company={t('exp.c1')} desc={t('exp.d1')} side="left" />
          <TimelineItem date="2024 — Present" role={t('exp.r2')} company={t('exp.c2')} desc={t('exp.d2')} side="right" />
          <TimelineItem date="2022 — 2023" role={t('exp.r3')} company={t('exp.c3')} desc={t('exp.d3')} side="left" />
          <TimelineItem date="2021 — 2022" role={t('exp.r4')} company={t('exp.c4')} desc={t('exp.d4')} side="right" />
        </div>
      </div>
    </section>
  )
}
