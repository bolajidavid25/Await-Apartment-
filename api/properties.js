export default async function handler(req, res) {
    
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
    })
  }

  const apiKey = process.env.REALESTATE_API_KEY

  // Make sure the API key exists
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

    if (!response.ok) {
      console.error('RealEstateAPI error:', data)

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
    })
  }
}