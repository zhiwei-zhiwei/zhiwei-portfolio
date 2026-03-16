"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, Mail, Phone, MapPin, Github, Linkedin, Gamepad2 } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'
import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface FormState {
  name: string
  email: string
  message: string
  honeypot: string
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '', honeypot: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        setForm({ name: '', email: '', message: '', honeypot: '' })
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClasses = cn(
    'w-full px-4 py-3 rounded-xl text-sm',
    'bg-[var(--glass-bg)] border border-[var(--border-subtle)]',
    'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
    'focus:outline-none focus:border-[var(--accent-cyan)] focus:shadow-[0_0_12px_var(--accent-glow)]',
    'transition-all duration-200'
  )

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Contact" subtitle="Let's build something together" />

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
          >
            <GlassCard glowBorder>
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle size={56} className="text-[var(--accent-cyan)] mb-4" />
                    </motion.div>
                    <h3 className="font-mono text-xl font-bold text-[var(--text-primary)] mb-2">
                      Message Received!
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-6">
                      Thanks for reaching out. I&apos;ll get back to you soon.
                    </p>
                    <Button variant="outline" onClick={() => setSuccess(false)}>
                      Send Another
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Honeypot — hidden from humans, bots fill this */}
                    <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.honeypot}
                        onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider mb-2">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="What's on your mind?"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={cn(inputClasses, 'resize-none')}
                      />
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm">{error}</p>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={loading}
                      className="w-full justify-center"
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          <Send size={15} />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-mono text-lg font-bold text-[var(--text-primary)] mb-4">
                Get In Touch
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                I&apos;m open to new opportunities, collaborations, and interesting conversations. Feel free to
                reach out for full-time roles, consulting, or just to say hello!
              </p>
            </div>

            <div className="space-y-4">
              {[
                { Icon: Mail, label: 'Email', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                { Icon: Phone, label: 'Phone', value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
                { Icon: MapPin, label: 'Location', value: SITE_CONFIG.location, href: null },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-glow)] border border-[var(--border-glow)] flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-[var(--accent-cyan)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider">{label}</p>
                    {href ? (
                      <a href={href} className="text-[var(--text-primary)] text-sm hover:text-[var(--accent-cyan)] transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-[var(--text-primary)] text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <p className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider mb-4">
                Find me on
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { href: SITE_CONFIG.github, Icon: Github, label: 'GitHub' },
                  { href: SITE_CONFIG.linkedin, Icon: Linkedin, label: 'LinkedIn' },
                  ...SITE_CONFIG.itchio.map((url) => ({
                    href: url,
                    Icon: Gamepad2,
                    label: 'Itch.io',
                  })),
                ].map(({ href, Icon, label }) => (
                  <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--accent-cyan)] hover:border-[var(--border-glow)] hover:bg-[var(--accent-glow)] transition-all duration-200 text-sm"
                  >
                    <Icon size={15} />
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
