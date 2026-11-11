import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import handler from './properties.js'
import fallbackProperties from './fallbackProperties.js'

function createMockRequest(method = 'GET') {
  return {
    method,
  }
}

function createMockResponse() {
  const res = {
    statusCode: null,
    headers: {},
    body: null,
    setHeader(name, value) {
      this.headers[name] = value
      return this
    },
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    },
    end() {
      return this
    },
  }
  return res
}

describe('Property photo filtering and merge in api/properties.js', () => {
  const originalApiKey = process.env.REALESTATE_API_KEY

  function setupApiKey(t) {
    process.env.REALESTATE_API_KEY = 'test-mock-api-key'
    t.after(() => {
      if (originalApiKey === undefined) {
        delete process.env.REALESTATE_API_KEY
      } else {
        process.env.REALESTATE_API_KEY = originalApiKey
      }
    })
  }

  test('retains live property with mlsHasPhotos: true and excludes mlsHasPhotos: false or undefined', async (t) => {
    setupApiKey(t)

    const mockLiveProperties = [
      {
        id: 'live-photo-true',
        mlsHasPhotos: true,
        mlsListingPrice: 350000,
        address: { address: '100 Beach Blvd', city: 'Destin', state: 'FL', zip: '32541' },
        bedrooms: 3,
        bathrooms: 2,
      },
      {
        id: 'live-photo-false',
        mlsHasPhotos: false,
        mlsListingPrice: 280000,
        address: { address: '200 Oak St', city: 'Pensacola', state: 'FL', zip: '32501' },
        bedrooms: 2,
        bathrooms: 1,
      },
      {
        id: 'live-photo-undefined',
        // mlsHasPhotos omitted
        mlsListingPrice: 310000,
        address: { address: '300 Pine Ave', city: 'Milton', state: 'FL', zip: '32570' },
        bedrooms: 4,
        bathrooms: 2,
      },
    ]

    t.mock.method(globalThis, 'fetch', async () => ({
      ok: true,
      json: async () => ({
        data: mockLiveProperties,
      }),
    }))

    const req = createMockRequest('GET')
    const res = createMockResponse()

    await handler(req, res)

    // Verify successful response
    assert.strictEqual(res.statusCode, 200)
    assert.strictEqual(res.body.success, true)
    assert.strictEqual(res.body.source, 'live+curated')

    // 1. Property with mlsHasPhotos: true is retained
    assert.strictEqual(
      res.body.properties.some((p) => p.id === 'live-photo-true'),
      true,
      'Live property with mlsHasPhotos: true should be retained'
    )

    // 2. Property with mlsHasPhotos: false is excluded
    assert.strictEqual(
      res.body.properties.some((p) => p.id === 'live-photo-false'),
      false,
      'Live property with mlsHasPhotos: false should be excluded'
    )

    // 3. Property without mlsHasPhotos is excluded
    assert.strictEqual(
      res.body.properties.some((p) => p.id === 'live-photo-undefined'),
      false,
      'Live property without mlsHasPhotos should be excluded'
    )

    // Verify merging with fallback properties (fallbackProperties length + 1 retained live property)
    const expectedCount = fallbackProperties.length + 1
    assert.strictEqual(res.body.count, expectedCount)
    assert.strictEqual(res.body.properties.length, expectedCount)

    // Ensure fallback properties are preserved
    for (const fallback of fallbackProperties) {
      assert.strictEqual(
        res.body.properties.some((p) => p.id === String(fallback.id)),
        true,
        `Fallback property ${fallback.id} should be preserved in merged results`
      )
    }
  })

  test('falls back to fallback properties when all live properties lack photos', async (t) => {
    setupApiKey(t)

    const mockLiveProperties = [
      {
        id: 'live-photo-false',
        mlsHasPhotos: false,
        mlsListingPrice: 280000,
      },
      {
        id: 'live-photo-undefined',
        mlsListingPrice: 310000,
      },
    ]

    t.mock.method(globalThis, 'fetch', async () => ({
      ok: true,
      json: async () => ({
        data: mockLiveProperties,
      }),
    }))

    const req = createMockRequest('GET')
    const res = createMockResponse()

    await handler(req, res)

    assert.strictEqual(res.statusCode, 200)
    assert.strictEqual(res.body.success, true)
    assert.strictEqual(res.body.source, 'fallback')
    assert.strictEqual(res.body.count, fallbackProperties.length)
    assert.strictEqual(res.body.properties.length, fallbackProperties.length)
    assert.deepStrictEqual(res.body.properties, fallbackProperties)
  })

  test('deduplicates property matching fallback ID and preserves fallback version', async (t) => {
    setupApiKey(t)

    const duplicateId = String(fallbackProperties[0].id)
    const mockLiveProperties = [
      {
        id: duplicateId,
        mlsHasPhotos: true,
        mlsListingPrice: 999999,
        address: { address: '999 Overwrite Way', city: 'Miami', state: 'FL', zip: '33101' },
        bedrooms: 10,
      },
    ]

    t.mock.method(globalThis, 'fetch', async () => ({
      ok: true,
      json: async () => ({
        data: mockLiveProperties,
      }),
    }))

    const req = createMockRequest('GET')
    const res = createMockResponse()

    await handler(req, res)

    assert.strictEqual(res.statusCode, 200)
    assert.strictEqual(res.body.success, true)
    assert.strictEqual(res.body.source, 'live+curated')

    // Find the property with duplicate ID
    const matches = res.body.properties.filter((p) => String(p.id) === duplicateId)

    // Verify that the final response contains that property only once
    assert.strictEqual(matches.length, 1, 'Duplicate ID should appear only once')

    // Verify that the fallback version takes precedence over the live version
    assert.strictEqual(
      matches[0].price,
      fallbackProperties[0].price,
      'Fallback version price should take precedence'
    )
    assert.strictEqual(
      matches[0].address.full,
      fallbackProperties[0].address.full,
      'Fallback version address should take precedence'
    )
    assert.notStrictEqual(
      matches[0].price,
      999999,
      'Live version price should not overwrite fallback property'
    )

    // Total count matches fallback properties count since no new unique live properties were added
    assert.strictEqual(res.body.count, fallbackProperties.length)
    assert.strictEqual(res.body.properties.length, fallbackProperties.length)
  })
})
