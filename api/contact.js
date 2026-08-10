import { Resend } from 'resend'


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not configured')
    return res.status(500).json({ error: 'Email service is not configured. Please set RESEND_API_KEY.' })
  }

  const resend = new Resend(resendApiKey)

  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    await resend.emails.send({
      from: "Await Apartment <onboarding@resend.dev>",
      to: ['bolajidavid05@gmail.com'],
      subject: `New contact form inquiry from ${name}`,
      html: `
        <div style="font-family: Inter, system-ui, sans-serif; color: #0f172a;">
          <h1 style="margin-bottom: 16px; color: #0f172a;">New Await Apartment inquiry</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
