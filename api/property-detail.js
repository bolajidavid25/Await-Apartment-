export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, x-api-key'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
    })
  }

  const apiKey = process.env.REALESTATE_API_KEY

  if (!apiKey) {
    return res.status(500).json({
      error: 'Real estate API is not configured',
    })
  }

  const { id } = req.query

  if (!id) {
    return res.status(400).json({
      error: 'Property ID is required',
    })
  }

  try {
    const response = await fetch(
      'https://api.realestateapi.com/v2/PropertyDetail',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },

        body: JSON.stringify({
          id,
        }),
      }
    )

    const data = await response.json()

    console.log('PROPERTY DETAIL STATUS:', response.status)
    console.log('PROPERTY DETAIL:', data)

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Property detail request failed',
        details: data,
      })
    }

    return res.status(200).json(data)
  } catch (error) {
    console.error('PROPERTY DETAIL ERROR:', error)

    return res.status(500).json({
      error: 'Failed to fetch property detail',
      details: error.message,
    })
  }
}