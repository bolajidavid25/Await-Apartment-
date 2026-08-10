export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, x-api-key'
  )

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
    })
  }

  // Get private API key from Vercel environment variables
  const apiKey = process.env.REALESTATE_API_KEY

  if (!apiKey) {
    console.error('REALESTATE_API_KEY is not configured')

    return res.status(500).json({
      error: 'Real estate API is not configured',
    })
  }

  try {
    const response = await fetch(
      'https://api.realestateapi.com/v2/PropertySearch',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
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

    console.log('RealEstateAPI STATUS:', response.status)
    console.log('RealEstateAPI RESPONSE:', data)

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'RealEstateAPI request failed',
        details: data,
      })
    }

    return res.status(200).json(data)
  } catch (error) {
    console.error('Property API error:', error)

    return res.status(500).json({
      error: 'Failed to fetch properties',
      details: error.message,
    })
  }
}