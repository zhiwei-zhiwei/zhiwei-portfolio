"use client"

import { motion } from 'framer-motion'

interface SkillTagProps {
  skill: string
  color: string
}

export default function SkillTag({ skill, color }: SkillTagProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.08, boxShadow: `0 0 12px ${color}55` }}
      className="inline-block px-3 py-1 rounded-full text-xs font-medium cursor-default transition-colors duration-200"
      style={{
        backgroundColor: `${color}18`,
        border: `1px solid ${color}44`,
        color: color,
      }}
    >
      {skill}
    </motion.span>
  )
}
