"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={cn('mb-12', className)}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="w-1 h-8 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_12px_var(--accent-cyan)]" />
        <h2 className="font-mono text-3xl font-bold text-[var(--accent-cyan)]">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-[var(--text-secondary)] ml-5 text-sm">{subtitle}</p>
      )}
      <div className="mt-3 ml-5 h-px w-24 bg-gradient-to-r from-[var(--accent-cyan)] to-transparent" />
    </motion.div>
  )
}
