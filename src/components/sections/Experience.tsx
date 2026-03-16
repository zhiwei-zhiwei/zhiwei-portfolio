"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Calendar, Building2 } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'
import { experience } from '@/data/experience'

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Experience" />

        <div ref={containerRef} className="relative">
          {/* Timeline center line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[var(--border-subtle)]">
            <motion.div
              className="w-full bg-[var(--accent-cyan)] origin-top shadow-[0_0_8px_var(--accent-cyan)]"
              style={{ scaleY: lineScaleY, height: '100%' }}
            />
          </div>

          {/* Mobile line */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-[var(--border-subtle)]">
            <motion.div
              className="w-full bg-[var(--accent-cyan)] origin-top"
              style={{ scaleY: lineScaleY, height: '100%' }}
            />
          </div>

          <div className="space-y-12">
            {experience.map((job, i) => {
              const isLeft = i % 2 === 0

              return (
                <div key={job.company} className="relative">
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full bg-[var(--accent-cyan)] border-2 border-[var(--bg-primary)] z-10 shadow-[0_0_12px_var(--accent-cyan)] items-center justify-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ repeat: Infinity, duration: 2.5 }}
                      className="w-3 h-3 rounded-full bg-[var(--accent-cyan)]"
                    />
                  </motion.div>

                  {/* Mobile dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="md:hidden absolute left-6 -translate-x-1/2 top-6 w-3 h-3 rounded-full bg-[var(--accent-cyan)] z-10 shadow-[0_0_8px_var(--accent-cyan)]"
                  />

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                    className={`
                      md:w-[calc(50%-2rem)]
                      ${isLeft ? 'md:mr-auto md:pr-4' : 'md:ml-auto md:pl-4'}
                      ml-14 md:ml-0
                    `}
                  >
                    <GlassCard glowBorder className="hover:shadow-[0_0_24px_var(--accent-glow)] transition-shadow duration-300">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-[var(--accent-glow)] border border-[var(--border-glow)] flex items-center justify-center flex-shrink-0">
                          <Building2 size={15} className="text-[var(--accent-cyan)]" />
                        </div>
                        <div>
                          <h3 className="font-mono font-bold text-[var(--text-primary)] leading-tight">
                            {job.role}
                          </h3>
                          <p className="text-[var(--accent-cyan)] text-sm font-semibold">{job.company}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-[var(--text-muted)] mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {job.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={11} />
                          {job.location}
                        </span>
                      </div>

                      <ul className="space-y-2">
                        {job.bullets.map((bullet, bi) => (
                          <li key={bi} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <span className="text-[var(--accent-cyan)] mt-1.5 flex-shrink-0 text-xs">▸</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
