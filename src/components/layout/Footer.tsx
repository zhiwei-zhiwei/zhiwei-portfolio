"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Gamepad2 } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Monogram */}
          <div className="font-mono text-xl font-bold text-[var(--accent-cyan)]">ZC</div>

          {/* Copyright */}
          <p className="text-[var(--text-muted)] text-sm text-center">
            © {currentYear} Zhiwei (Jackson) Cao. Built with Next.js & Framer Motion.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.15, color: '#00e5ff' }}
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={18} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15, color: '#00e5ff' }}
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </motion.a>
            {SITE_CONFIG.itchio.map((url) => (
              <motion.a
                key={url}
                whileHover={{ scale: 1.15, color: '#ffb300' }}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--accent-amber)] transition-colors duration-200 text-xs font-mono"
                aria-label="Itch.io"
              >
                <Gamepad2 size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
