"use client"

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const activities = [
  {
    label: "Google Developer Student Club",
    color: "#00e5ff",
    icon: "🔵",
  },
  {
    label: "Lyft Back-End Engineering Virtual Experience",
    color: "#ffb300",
    icon: "🟡",
  },
  {
    label: "Hackathon Participant",
    color: "#10b981",
    icon: "🟢",
  },
]

export default function Activities() {
  return (
    <section id="activities" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Activities" subtitle="Communities and experiences" />

        <div className="overflow-x-auto pb-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex gap-4 min-w-max"
          >
            {activities.map((activity, i) => (
              <motion.div
                key={activity.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="flex items-center gap-3 px-5 py-4 rounded-2xl border cursor-default select-none"
                style={{
                  backgroundColor: `${activity.color}10`,
                  borderColor: `${activity.color}33`,
                  boxShadow: `0 0 0 0 ${activity.color}`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${activity.color}20` }}
                >
                  <Award size={16} style={{ color: activity.color }} />
                </div>
                <span
                  className="font-medium text-sm whitespace-nowrap"
                  style={{ color: activity.color }}
                >
                  {activity.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
