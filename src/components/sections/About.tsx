"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, GraduationCap, Cpu } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'
import { SITE_CONFIG } from '@/lib/constants'

const quickFacts = [
  { Icon: MapPin, label: 'Location', value: SITE_CONFIG.location },
  { Icon: GraduationCap, label: 'Education', value: 'UChicago MPCS + UW-Madison CS/Game Design' },
  { Icon: Cpu, label: 'Focus', value: 'ML Systems · Full-Stack · Game Design' },
]

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="About Me" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Animated gradient ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-amber)] to-[var(--accent-cyan)] animate-spin-slow opacity-75 blur-sm" />
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-2 border-[var(--border-glow)]">
                <Image
                  src="/images/self.jpg"
                  alt="Zhiwei (Jackson) Cao"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Glow */}
              <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(0,229,255,0.2)]" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
              I&apos;m a software engineer based in Chicago, IL, passionate about building systems where AI meets
              real-world complexity. I recently completed my MPCS at the University of Chicago and hold a BS
              in Computer Science &amp; Game Design from UW–Madison.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              At Cliffwater LLC, I architect end-to-end ML pipelines for unstructured financial documents — from
              ingestion to LLM-powered classification and structured extraction. My background spans distributed
              systems, back-end engineering (Epic Systems, COFOR Thingsnet), and creative game design.
            </p>

            <GlassCard className="mt-6 space-y-4">
              {quickFacts.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-glow)] border border-[var(--border-glow)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={14} className="text-[var(--accent-cyan)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider">{label}</p>
                    <p className="text-[var(--text-primary)] text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
