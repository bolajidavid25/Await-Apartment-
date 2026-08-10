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
          size: 20,
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

    /*
     * Normalize the external API response.
     *
     * We deliberately keep the frontend independent
     * from RealEstateAPI's complicated object structure.
     */

    const properties = (data.data || [])
      .filter((property) => property.mlsHasPhotos === true)
      .map((property) => ({
        id: property.id,

        price: property.mlsListingPrice ?? null,

        address: {
          full: property.address?.address ?? null,
          street: property.address?.street ?? null,
          city: property.address?.city ?? null,
          state: property.address?.state ?? null,
          zip: property.address?.zip ?? null,
        },

        propertyType:
          property.propertyUse ||
          property.propertyType ||
          'Residential',

        bedrooms: property.bedrooms ?? null,

        bathrooms: property.bathrooms ?? null,

        squareFeet:
          property.squareFeet ??
          property.livingSquareFeet ??
          null,

        yearBuilt: property.yearBuilt ?? null,

        status: property.mlsStatus ?? null,

        listingType: property.mlsType ?? null,

        daysOnMarket: property.mlsDaysOnMarket ?? null,

        hasPhotos: property.mlsHasPhotos === true,

        /*
         * We don't have actual MLS image URLs yet.
         * These will be populated when MLS access is available.
         */
        image: null,

        photos: [],
      }))

    console.log(
      `Returning ${properties.length} properties with photo metadata`
    )

    return res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    })
  } catch (error) {
    console.error('Property API error:', error)

    return res.status(500).json({
      error: 'Failed to fetch properties',
      details: error.message,
    })
  }
}