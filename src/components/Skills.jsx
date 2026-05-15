import { useLanguage } from '../hooks/useLanguage'
import { useScrollReveal } from '../hooks/useScrollReveal'

function SkillGroup({ title, items, icon }) {
  const [ref, isVisible] = useScrollReveal()
  return (
    <div ref={ref} className={`glass-card skill-group reveal ${isVisible ? 'active' : ''}`}>
      <div className="skill-group__header">
        <span className="skill-group__icon">{icon}</span>
        <h3 className="skill-group__title">{title}</h3>
      </div>
      <div className="skill-group__items">
        {items.map(i => (
          <span key={i} className="skill-pill">
            {i}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const { t } = useLanguage()
  const [ref1, isVisible1] = useScrollReveal()

  const skillGroups = [
    { title: t('skills.lang'), items: ['JavaScript', 'TypeScript', 'Python', 'C#', 'Java', 'C'], icon: '💻' },
    { title: 'Frontend', items: ['React', 'Next.js', 'HTML5', 'CSS3', 'Vite'], icon: '🎨' },
    { title: 'Backend', items: ['Node.js', 'Spring Boot', '.NET', 'Express.js'], icon: '⚙️' },
    { title: 'AI & ML', items: ['Gemini AI', 'LLM Integration', 'MCP', 'NEAT', 'Neural Networks'], icon: '🧠' },
    {
      title: t('skills.db'),
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21c-4.418 0-8-1.79-8-4s3.582-4 8-4 8 1.79 8 4-3.582 4-8 4zM12 13c-4.418 0-8-1.79-8-4s3.582-4 8-4 8 1.79 8 4-3.582 4-8 4zM12 5c-4.418 0-8-1.79-8-4s3.582-4 8-4 8 1.79 8 4-3.582 4-8 4z"/></svg>,
      items: ['PostgreSQL', 'MongoDB', 'Redis', 'SQL']
    },
    {
      title: 'Cloud & DevOps',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.5 19c.7 0 1.3-.2 1.8-.7.5-.5.7-1.1.7-1.8 0-1.2-.9-2.3-2.1-2.5C17.4 11.5 15.1 9 12 9c-2.4 0-4.5 1.5-5.3 3.7C5.1 12.9 4 14.3 4 16c0 1.7 1.3 3 3 3h10.5z"/></svg>,
      items: ['Vercel', 'Netlify', 'Docker', 'CI/CD', 'Git']
    }
  ]

  return (
    <section className="section section--skills" id="skills">
      <div className="container">
        <div ref={ref1} className={`section__header reveal ${isVisible1 ? 'active' : ''}`}>
          <h2 className="section__title">{t('skills.title')}</h2>
        </div>
        <div className="skills__grid">
          {skillGroups.map(group => (
            <SkillGroup key={group.title} title={group.title} items={group.items} icon={group.icon} />
          ))}
        </div>
      </div>
    </section>
  )
}

