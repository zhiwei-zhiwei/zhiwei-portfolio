"use client"

import { motion } from 'framer-motion'
import { GraduationCap, Calendar } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'
import SkillTag from '@/components/ui/SkillTag'
import { education } from '@/data/education'

export default function Education() {
  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Education" />

        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, ease: 'easeOut', delay: i * 0.1 }}
            >
              <GlassCard glowBorder className="h-full hover:shadow-[0_0_30px_var(--accent-glow)] transition-shadow duration-300">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-glow)] border border-[var(--border-glow)] flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={18} className="text-[var(--accent-cyan)]" />
                  </div>
                  <div>
                    <h3 className="font-mono text-lg font-bold text-[var(--text-primary)] leading-tight">
                      {edu.school}
                    </h3>
                    <p className="text-[var(--accent-amber)] text-sm font-medium mt-0.5">{edu.degree}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] mb-5">
                  <Calendar size={13} />
                  <span>Graduated {edu.graduated}</span>
                </div>

                <div>
                  <p className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider mb-3">
                    Coursework
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course) => (
                      <SkillTag key={course} skill={course} color="#00e5ff" />
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
