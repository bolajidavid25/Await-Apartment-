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

app.listen(PORT, () => {
  console.log(`Await Apartment API running on http://localhost:${PORT}`)
})