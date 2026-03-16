"use client"

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Calendar } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import SkillTag from '@/components/ui/SkillTag'
import { projects } from '@/data/projects'

interface TiltState {
  rotateX: number
  rotateY: number
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 8
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 6
    setTilt({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 })
    setIsHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: 'transform 0.15s ease',
        }}
        className={`
          relative rounded-2xl p-6 h-full
          bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)]
          border border-[var(--border-subtle)]
          transition-all duration-300
          ${isHovered ? 'shadow-[0_0_30px_var(--accent-glow)] border-[var(--border-glow)]' : ''}
        `}
      >
        {/* Gradient border overlay on hover */}
        {isHovered && (
          <div className="absolute inset-0 rounded-2xl opacity-20 bg-gradient-to-br from-[var(--accent-cyan)] via-transparent to-[var(--accent-amber)] pointer-events-none" />
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{project.emoji}</span>
            <div>
              <h3 className="font-mono font-bold text-[var(--text-primary)] text-base">
                {project.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] mt-0.5">
                <Calendar size={10} />
                {project.period}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {project.github && (
              <motion.a
                whileHover={{ scale: 1.2, color: 'var(--accent-cyan)' }}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors"
                aria-label="GitHub"
              >
                <Github size={16} />
              </motion.a>
            )}
            {project.live && (
              <motion.a
                whileHover={{ scale: 1.2 }}
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors"
                aria-label="Live site"
              >
                <ExternalLink size={16} />
              </motion.a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <SkillTag key={tech} skill={tech} color="#00e5ff" />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Projects" subtitle="Things I've built" />

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
