"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'outline'
  className?: string
  href?: string
  download?: boolean | string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  className,
  href,
  download,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer select-none',
    variant === 'primary' && [
      'bg-gradient-to-r from-[var(--accent-cyan)] to-cyan-400 text-[var(--bg-primary)]',
      'shadow-[0_0_20px_rgba(0,229,255,0.3)]',
      'hover:shadow-[0_0_32px_rgba(0,229,255,0.5)] hover:scale-105',
      'font-semibold',
    ],
    variant === 'outline' && [
      'border border-[var(--border-glow)] text-[var(--accent-cyan)]',
      'bg-[var(--glass-bg)] backdrop-blur-sm',
      'hover:bg-[var(--accent-glow)] hover:shadow-[0_0_16px_var(--accent-glow)]',
    ],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href) {
    return (
      <motion.a
        whileHover={{ scale: disabled ? 1 : 1.04 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        href={href}
        download={download}
        className={baseClasses}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.04 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </motion.button>
  )
}
