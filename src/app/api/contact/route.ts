import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'zhiweijob@outlook.com',
      subject: `New message from ${name} — Portfolio`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    return NextResponse.json({ success: true, message: 'Message sent!' })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ success: false, message: 'Failed to send message.' }, { status: 500 })
  }
}
