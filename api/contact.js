import { Resend } from 'resend'

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message, type, date, time, phone, property } = req.body || {}

  const isInspection = type === 'inspection'
  const hasName = typeof name === 'string' && name.trim().length > 0
  const hasEmail = typeof email === 'string' && email.trim().length > 0
  const hasMessage = typeof message === 'string' && message.trim().length > 0

  if (!hasName || !hasEmail || (!hasMessage && !isInspection)) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not configured')
    return res.status(500).json({ error: 'Email service is not configured. Please set RESEND_API_KEY.' })
  }

  const resend = new Resend(resendApiKey)

  const trimmedName = name.trim()
  const trimmedEmail = email.trim()
  const trimmedMessage = typeof message === 'string' ? message.trim() : ''

  const subject = isInspection
    ? `Property Inspection Request from ${trimmedName}`
    : `New contact form inquiry from ${trimmedName}`

  const htmlContent = isInspection
    ? `
        <div style="font-family: Inter, system-ui, sans-serif; color: #0f172a;">
          <h1 style="margin-bottom: 16px; color: #0f172a;">New Property Inspection Request</h1>
          <p><strong>Name:</strong> ${trimmedName}</p>
          <p><strong>Email:</strong> ${trimmedEmail}</p>
          ${phone ? `<p><strong>Phone:</strong> ${String(phone).trim()}</p>` : ''}
          <p><strong>Date:</strong> ${date || 'Not specified'}</p>
          <p><strong>Time:</strong> ${time || 'Not specified'}</p>
          <p><strong>Property:</strong> ${property?.id || 'General'}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${trimmedMessage || 'N/A'}</p>
        </div>
      `
    : `
        <div style="font-family: Inter, system-ui, sans-serif; color: #0f172a;">
          <h1 style="margin-bottom: 16px; color: #0f172a;">New Await Apartment inquiry</h1>
          <p><strong>Name:</strong> ${trimmedName}</p>
          <p><strong>Email:</strong> ${trimmedEmail}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${trimmedMessage}</p>
        </div>
      `

  try {
    await resend.emails.send({
      from: 'Await Apartment <onboarding@resend.dev>',
      to: ['bolajidavid05@gmail.com'],
      subject,
      html: htmlContent,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Failed to send email via Resend:', error)
    return res.status(500).json({ error: error.message || 'Failed to send email' })
  }
}
