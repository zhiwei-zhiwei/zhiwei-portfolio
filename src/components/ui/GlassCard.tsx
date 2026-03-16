"use client"

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  glowBorder?: boolean
}

export default function GlassCard({ children, className, glowBorder = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl p-6',
        'bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)]',
        'border border-[var(--border-subtle)]',
        glowBorder && 'border-[var(--border-glow)] shadow-[0_0_24px_var(--accent-glow)]',
        className
      )}
    >
      {children}
    </div>
  )
}
