import { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { useScrollReveal } from '../hooks/useScrollReveal'

const projectData = [
  { 
    id: 'thermo', 
    category: 'ai', 
    img: '/projects/thermo.png', 
    badge: 'AI / Startup', 
    tech: ['Next.js', 'Gemini AI', 'Firebase', 'IoT'],
    demo: 'https://thermo-sense-ai.vercel.app/'
  },
  { 
    id: 'neptune', 
    category: 'fullstack', 
    img: '/projects/neptune.png', 
    badge: 'Full-Stack / Education', 
    tech: ['TypeScript', 'Next.js', 'Vercel'], 
    link: 'https://github.com/lracz/neptune-4-max-training',
    demo: 'https://neptune-4-max-training.vercel.app/'
  },
  { 
    id: 'gravity', 
    category: 'ai', 
    img: '/projects/gravity.png', 
    badge: 'AI Agent', 
    tech: ['Node.js', 'Gemini AI', 'MCP', 'Telegram'] 
  },
  { 
    id: 'flappy', 
    category: 'ai', 
    img: '/projects/flappy.png', 
    badge: 'Machine Learning', 
    tech: ['Python', 'NEAT', 'Neural Networks'], 
    link: 'https://github.com/lracz/FlappyAI' 
  },
  { 
    id: 'muszak', 
    category: 'fullstack', 
    img: '/projects/muszak.png', 
    badge: 'Full-Stack / Enterprise', 
    tech: ['C#', '.NET'], 
    link: 'https://github.com/lracz/muszak-tervezo',
    demo: 'https://muszak-tervezo.vercel.app/'
  },
  { 
    id: 'shop', 
    category: 'fullstack', 
    img: '/projects/shop.png', 
    badge: 'Full-Stack / E-commerce', 
    tech: ['TypeScript', 'React', 'Spring Boot', 'Java'], 
    link: 'https://github.com/lracz/SpringReactShop' 
  },
]

function ProjectCard({ p }) {
  const { t } = useLanguage()
  const [ref, isVisible] = useScrollReveal()
  return (
    <div ref={ref} className={`project-card reveal ${isVisible ? 'active' : ''}`}>
      <div className="project-card__image-wrapper">
        <img src={p.img} alt={p.id} className="project-card__img" loading="lazy" />
        <div className="project-card__overlay">
           <div className="project-card__actions">
             {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="btn btn--primary btn--sm">{t('proj.demo')}</a>}
             {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="btn btn--outline btn--sm">GitHub</a>}
           </div>
        </div>
      </div>
      <div className="project-card__body">
        <div className="project-card__category">
          <span className={`badge badge--category ${p.category === 'ai' ? 'badge--secondary' : ''}`}>{p.badge}</span>
        </div>
        <h3 className="project-card__title">
          {p.id === 'thermo' ? 'ThermoSense AI' : 
           p.id === 'neptune' ? 'Neptune 4 Max Training' : 
           p.id === 'gravity' ? 'Gravity Claw AI Agent' : 
           p.id === 'flappy' ? 'FlappyAI' : 
           p.id === 'muszak' ? 'Műszak Tervező' : 'SpringReactShop'}
        </h3>
        <p className="project-card__desc">{t(`proj.${p.id}`)}</p>
        <div className="project-card__tech">
          {p.tech.map(tech => <span key={tech} className="skill-pill skill-pill--sm">{tech}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const [ref1, isVisible1] = useScrollReveal()
  const [ref2, isVisible2] = useScrollReveal()
  const [filter, setFilter] = useState('all')

  const filtered = projectData.filter(p => filter === 'all' || p.category === filter)

  return (
    <section className="section" id="projects">
      <div className="container">
        <div ref={ref1} className={`section__header reveal ${isVisible1 ? 'active' : ''}`}>
          <h2 className="section__title">{t('proj.title')}</h2>
          <p className="section__subtitle">{t('proj.sub')}</p>
        </div>
        
        <div ref={ref2} className={`filter-tabs reveal ${isVisible2 ? 'active' : ''}`}>
          <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>{t('proj.all')}</button>
          <button className={`filter-tab ${filter === 'ai' ? 'active' : ''}`} onClick={() => setFilter('ai')}>{t('proj.ai')}</button>
          <button className={`filter-tab ${filter === 'fullstack' ? 'active' : ''}`} onClick={() => setFilter('fullstack')}>{t('proj.fs')}</button>
        </div>

        <div className="projects__grid">
          {filtered.map(p => <ProjectCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  )
}

