import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'Await Apartment API is running'
  })
})

// Real estate properties
app.get('/api/properties', async (req, res) => {
  try {
    const response = await fetch(
      'https://api.realestateapi.com/v2/PropertySearch',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REALESTATE_API_KEY,
        },
        body: JSON.stringify({
          size: 10,
          state: 'FL',
          mls_active: true,
          property_type: 'SFR',
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'RealEstateAPI request failed',
        details: data,
      })
    }

    res.json(data)
  } catch (error) {
    console.error('Property API error:', error)

    res.status(500).json({
      error: 'Failed to fetch properties',
    })
  }
})

// Contact inquiry endpoint (local dev parity with api/contact.js)
app.post('/api/contact', async (req, res) => {
  const { name, email, message, type, date, time, property } = req.body || {}

  if (!name || !email || (!message && type !== 'inspection')) {
    return res.status(400).json({ error: 'Missing required fields (name, email, message)' })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    console.warn('RESEND_API_KEY is not configured on server')
    return res.status(500).json({
      error: 'Email service is not configured. Please set RESEND_API_KEY in your server environment.',
    })
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(resendApiKey)

    const subject = type === 'inspection'
      ? `Property Inspection Request from ${name}`
      : `New contact form inquiry from ${name}`

    const htmlContent = type === 'inspection'
      ? `
        <div style="font-family: Inter, system-ui, sans-serif; color: #0f172a;">
          <h1 style="margin-bottom: 16px; color: #0f172a;">New Property Inspection Request</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${date || 'Not specified'}</p>
          <p><strong>Time:</strong> ${time || 'Not specified'}</p>
          <p><strong>Property:</strong> ${property?.id || 'General'}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message || 'N/A'}</p>
        </div>
      `
      : `
        <div style="font-family: Inter, system-ui, sans-serif; color: #0f172a;">
          <h1 style="margin-bottom: 16px; color: #0f172a;">New Await Apartment inquiry</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `

    await resend.emails.send({
      from: 'Await Apartment <onboarding@resend.dev>',
      to: ['bolajidavid05@gmail.com'],
      subject,
      html: htmlContent,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Failed to send email via Resend:', error)
    return res.status(500).json({ error: error.message || 'Failed to dispatch email' })
  }
})

app.listen(PORT, () => {
  console.log(`Await Apartment API running on http://localhost:${PORT}`)
})