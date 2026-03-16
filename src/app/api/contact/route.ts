import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// ── Rate limiting (in-memory, resets on cold start) ──────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 3
const RATE_WINDOW_MS = 10 * 60 * 1000 // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  if (entry.count >= RATE_LIMIT) return true
  entry.count++
  return false
}

// ── Spam / content filtering ─────────────────────────────────────────────────
const SPAM_KEYWORDS = [
  'casino', 'viagra', 'crypto', 'bitcoin', 'nft', 'investment opportunity',
  'click here', 'earn money', 'make money fast', 'free money', 'winner',
  'congratulations you', 'loan offer', 'seo service', 'buy followers',
  'cheap meds', 'enlargement', 'weight loss', 'MLM', 'ponzi',
]

const URL_REGEX = /https?:\/\/[^\s]+/gi

function spamScore(text: string): number {
  const lower = text.toLowerCase()
  let score = 0

  // Spam keywords
  for (const kw of SPAM_KEYWORDS) {
    if (lower.includes(kw)) score += 2
  }

  // Too many URLs
  const urls = text.match(URL_REGEX) ?? []
  if (urls.length > 2) score += urls.length

  // ALL CAPS ratio
  const letters = text.replace(/[^a-zA-Z]/g, '')
  if (letters.length > 10) {
    const capsRatio = (text.replace(/[^A-Z]/g, '').length) / letters.length
    if (capsRatio > 0.6) score += 3
  }

  // Repeated characters (aaaaaa)
  if (/(.)\1{5,}/.test(text)) score += 2

  return score
}

// ── Handler ───────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many messages. Please wait a few minutes.' },
        { status: 429 }
      )
    }

    const { name, email, message, honeypot } = await req.json()

    // Honeypot — bots fill this hidden field, humans never see it
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Message sent!' }) // silently discard
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 })
    }
    if (name.length > 100 || email.length > 200 || message.length > 3000) {
      return NextResponse.json({ success: false, message: 'Input too long.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Invalid email address.' }, { status: 400 })
    }

    // Spam check
    const score = spamScore(name) + spamScore(message)
    if (score >= 4) {
      return NextResponse.json({ success: true, message: 'Message sent!' }) // silently discard spam
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New message from ${name} — Portfolio`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr/>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    })

    return NextResponse.json({ success: true, message: 'Message sent!' })
  } catch (err) {
    console.error('Mail error:', err)
    return NextResponse.json({ success: false, message: 'Failed to send message.' }, { status: 500 })
  }
}
