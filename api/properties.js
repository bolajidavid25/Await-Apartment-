export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, x-api-key'
  )

  // Handle browser preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
    })
  }

  const apiKey = process.env.REALESTATE_API_KEY

  if (!apiKey) {
    console.error('REALESTATE_API_KEY is not configured')

    return res.status(500).json({
      error: 'Real estate API is not configured',
    })
  }

  try {
    const response = await fetch(
      'https://api.realestateapi.com/v2/MLSSearch',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },

        body: JSON.stringify({
          size: 20,
          state: 'FL',
          active: true,
          has_photos: true,
          include_photos: true,
          latest_only: true,
        }),
      }
    )

    const data = await response.json()

    console.log('MLS API STATUS:', response.status)
    console.log('MLS API RESPONSE:', data)

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'RealEstateAPI MLS request failed',
        details: data,
      })
    }

    return res.status(200).json(data)
  } catch (error) {
    console.error('MLS API ERROR:', error)

    return res.status(500).json({
      error: 'Failed to fetch MLS properties',
      details: error.message,
    })
  }
}