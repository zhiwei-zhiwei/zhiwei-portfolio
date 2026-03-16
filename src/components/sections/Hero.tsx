"use client"

import dynamic from 'next/dynamic'
import { motion, type Variants } from 'framer-motion'
import { Github, Linkedin, Gamepad2, ChevronDown, Download, MapPin, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import TypeWriter from '@/components/ui/TypeWriter'
import Button from '@/components/ui/Button'

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false })

const ROLES = ["Software Engineer", "ML Pipeline Builder", "Game Designer", "Full-Stack Developer"]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[var(--bg-primary)]/60 via-transparent to-[var(--bg-primary)]/80" />
      <div className="absolute bottom-0 left-0 right-0 h-48 z-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            className="font-mono text-[var(--accent-cyan)] text-sm sm:text-base mb-3 tracking-widest uppercase"
          >
            &gt; Hello, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-mono text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[var(--text-primary)] mb-4 leading-tight"
          >
            Zhiwei{' '}
            <span className="text-[var(--accent-cyan)] [text-shadow:0_0_30px_rgba(0,229,255,0.5)]">
              (Jackson)
            </span>{' '}
            Cao
          </motion.h1>

          {/* TypeWriter roles */}
          <motion.div
            variants={itemVariants}
            className="text-xl sm:text-2xl text-[var(--text-secondary)] mb-8 h-9 font-mono"
          >
            <TypeWriter words={ROLES} loop />
          </motion.div>

          {/* Meta info */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-8 text-sm text-[var(--text-muted)]"
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[var(--accent-cyan)]" />
              {SITE_CONFIG.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={14} className="text-[var(--accent-cyan)]" />
              {SITE_CONFIG.email}
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Button variant="primary" onClick={scrollToProjects}>
              View My Work
            </Button>
            <Button variant="outline" href="/resume.pdf" download>
              <Download size={16} />
              Download Resume
            </Button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-5"
          >
            {[
              { href: SITE_CONFIG.github, Icon: Github, label: 'GitHub', color: 'var(--accent-cyan)' },
              { href: SITE_CONFIG.linkedin, Icon: Linkedin, label: 'LinkedIn', color: 'var(--accent-cyan)' },
              ...SITE_CONFIG.itchio.map((url, i) => ({
                href: url,
                Icon: Gamepad2,
                label: `Itch.io ${i + 1}`,
                color: 'var(--accent-amber)',
              })),
            ].map(({ href, Icon, label, color }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{
                  scale: 1.2,
                  boxShadow: `0 0 16px ${color}`,
                }}
                className="w-10 h-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--glass-bg)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-cyan)] hover:border-[var(--border-glow)] transition-colors duration-200"
                style={{ '--icon-color': color } as React.CSSProperties}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll chevron */}
      <motion.button
        onClick={scrollToAbout}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors duration-200 cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  )
}
