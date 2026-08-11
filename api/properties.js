export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, x-api-key'
  )

  // Browser preflight
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

  // --------------------------------------------------
  // FALLBACK PROPERTY
  // --------------------------------------------------

  const fallbackProperties = [
    {
      id: '229694294',

      price: 475000,

      address: {
        full: '4090 Manchester Ct, Pace, FL 32571',
        street: '4090 Manchester Ct',
        city: 'Pace',
        state: 'FL',
        zip: '32571',
      },

      propertyType: 'Single Family Residence',

      bedrooms: 4,
      bathrooms: 2,
      squareFeet: 2474,
      yearBuilt: 2021,

      status: 'Active',
      listingType: 'ForSale',
      daysOnMarket: 110,

      hasPhotos: true,

      image: '/properties/229694294/exterior.png',

      photos: [
        '/properties/229694294/exterior.png',
        '/properties/229694294/living-room.png',
        '/properties/229694294/kitchen.png',
        '/properties/229694294/bedroom.png',
      ],
    },
  ]

  // --------------------------------------------------
  // NO API KEY → FALLBACK
  // --------------------------------------------------

  if (!apiKey) {
    console.warn(
      'REALESTATE_API_KEY is not configured. Using fallback properties.'
    )

    return res.status(200).json({
      success: true,
      version: 'fallback-v1',
      source: 'fallback',
      count: fallbackProperties.length,
      properties: fallbackProperties,
    })
  }

  // --------------------------------------------------
  // LIVE REAL ESTATE API
  // --------------------------------------------------

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

    // --------------------------------------------------
    // LIVE API ERROR → FALLBACK
    // --------------------------------------------------

    if (!response.ok) {
      console.error('RealEstateAPI error:', data)

      return res.status(200).json({
        success: true,
        version: 'fallback-v1',
        source: 'fallback',
        count: fallbackProperties.length,
        properties: fallbackProperties,
      })
    }

    // --------------------------------------------------
    // NORMALIZE LIVE PROPERTIES
    // --------------------------------------------------

    const properties = (data.data || [])
      .filter(
        (property) =>
          property.mlsHasPhotos === true
      )
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

        squareFeet: property.squareFeet ?? null,

        yearBuilt: property.yearBuilt ?? null,

        status: property.mlsStatus ?? null,

        listingType: property.mlsType ?? null,

        daysOnMarket:
          property.mlsDaysOnMarket ?? null,

        hasPhotos: true,

        image: `/properties/${property.id}/exterior.png`,

        photos: [
          `/properties/${property.id}/exterior.png`,
          `/properties/${property.id}/living-room.png`,
          `/properties/${property.id}/kitchen.png`,
          `/properties/${property.id}/bedroom.png`,
        ],
      }))

    // --------------------------------------------------
    // NO LIVE RESULTS → FALLBACK
    // --------------------------------------------------

    if (properties.length === 0) {
      console.warn(
        'Live API returned no usable properties. Using fallback.'
      )

      return res.status(200).json({
        success: true,
        version: 'fallback-v1',
        source: 'fallback',
        count: fallbackProperties.length,
        properties: fallbackProperties,
      })
    }

    // --------------------------------------------------
    // LIVE SUCCESS
    // --------------------------------------------------

    res.setHeader(
      'Cache-Control',
      's-maxage=300, stale-while-revalidate=600'
    )

    return res.status(200).json({
      success: true,
      version: 'normalized-v1',
      source: 'live',
      count: properties.length,
      properties,
    })
  } catch (error) {
    // --------------------------------------------------
    // UNEXPECTED ERROR → FALLBACK
    // --------------------------------------------------

    console.error('Property API error:', error)

    return res.status(200).json({
      success: true,
      version: 'fallback-v1',
      source: 'fallback',
      count: fallbackProperties.length,
      properties: fallbackProperties,
    })
  }
}