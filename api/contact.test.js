import { describe, test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { Resend } from 'resend'

// Ensure Express server does not bind to port 5000 during test execution
process.env.NODE_ENV = 'test'

import vercelContactHandler from './contact.js'
import { contactHandler as expressContactHandler } from '../server/server.js'

function createMockRequest(body = {}, method = 'POST') {
  return {
    method,
    body,
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

describe('Contact API Validation Consistency (Vercel & Express)', () => {
  const originalApiKey = process.env.RESEND_API_KEY
  let originalSend

  before(() => {
    process.env.RESEND_API_KEY = 're_test_mock_key'
    const proto = Object.getPrototypeOf(new Resend('re_mock_key').emails)
    originalSend = proto.send
    proto.send = async () => ({ data: { id: 'mock-email-id' }, error: null })
  })

  after(() => {
    if (originalApiKey === undefined) {
      delete process.env.RESEND_API_KEY
    } else {
      process.env.RESEND_API_KEY = originalApiKey
    }
    const proto = Object.getPrototypeOf(new Resend('re_mock_key').emails)
    proto.send = originalSend
  })

  const handlers = [
    { name: 'Vercel Serverless Handler (api/contact.js)', handler: vercelContactHandler },
    { name: 'Express Route Handler (server/server.js)', handler: expressContactHandler },
  ]

  for (const { name: handlerName, handler } of handlers) {
    describe(handlerName, () => {
      test('accepts an inspection request without a message', async () => {
        const req = createMockRequest({
          type: 'inspection',
          name: 'Jane Doe',
          email: 'jane@example.com',
          phone: '+1 555-123-4567',
          date: '2026-11-20',
          time: '15:00',
          property: { id: 'p1' },
        })
        const res = createMockResponse()

        await handler(req, res)

        assert.strictEqual(res.statusCode, 200)
        assert.deepStrictEqual(res.body, { ok: true })
      })

      test('accepts an inspection request with an empty string message', async () => {
        const req = createMockRequest({
          type: 'inspection',
          name: 'Jane Doe',
          email: 'jane@example.com',
          phone: '+1 555-123-4567',
          date: '2026-11-20',
          time: '15:00',
          message: '',
          property: { id: 'p1' },
        })
        const res = createMockResponse()

        await handler(req, res)

        assert.strictEqual(res.statusCode, 200)
        assert.deepStrictEqual(res.body, { ok: true })
      })

      test('accepts an inspection request with a whitespace-only message', async () => {
        const req = createMockRequest({
          type: 'inspection',
          name: 'Jane Doe',
          email: 'jane@example.com',
          phone: '+1 555-123-4567',
          date: '2026-11-20',
          time: '15:00',
          message: '   \n\t  ',
          property: { id: 'p1' },
        })
        const res = createMockResponse()

        await handler(req, res)

        assert.strictEqual(res.statusCode, 200)
        assert.deepStrictEqual(res.body, { ok: true })
      })

      test('accepts an inspection request with a message', async () => {
        const req = createMockRequest({
          type: 'inspection',
          name: 'Jane Doe',
          email: 'jane@example.com',
          phone: '+1 555-123-4567',
          date: '2026-11-20',
          time: '15:00',
          message: 'Please confirm parking availability upon arrival.',
          property: { id: 'p1' },
        })
        const res = createMockResponse()

        await handler(req, res)

        assert.strictEqual(res.statusCode, 200)
        assert.deepStrictEqual(res.body, { ok: true })
      })

      test('rejects a general inquiry without a message', async () => {
        const req = createMockRequest({
          name: 'John Smith',
          email: 'john@example.com',
        })
        const res = createMockResponse()

        await handler(req, res)

        assert.strictEqual(res.statusCode, 400)
        assert.deepStrictEqual(res.body, { error: 'Missing required fields' })
      })

      test('rejects a general inquiry with an empty or whitespace message', async () => {
        const req = createMockRequest({
          name: 'John Smith',
          email: 'john@example.com',
          message: '   ',
        })
        const res = createMockResponse()

        await handler(req, res)

        assert.strictEqual(res.statusCode, 400)
        assert.deepStrictEqual(res.body, { error: 'Missing required fields' })
      })

      test('accepts a general inquiry with a valid message', async () => {
        const req = createMockRequest({
          name: 'John Smith',
          email: 'john@example.com',
          message: 'I am interested in scheduling a portfolio consultation for coastal properties.',
        })
        const res = createMockResponse()

        await handler(req, res)

        assert.strictEqual(res.statusCode, 200)
        assert.deepStrictEqual(res.body, { ok: true })
      })

      test('rejects an inspection request missing a name', async () => {
        const req = createMockRequest({
          type: 'inspection',
          email: 'jane@example.com',
          date: '2026-11-20',
          time: '15:00',
        })
        const res = createMockResponse()

        await handler(req, res)

        assert.strictEqual(res.statusCode, 400)
        assert.deepStrictEqual(res.body, { error: 'Missing required fields' })
      })

      test('rejects an inspection request missing an email', async () => {
        const req = createMockRequest({
          type: 'inspection',
          name: 'Jane Doe',
          date: '2026-11-20',
          time: '15:00',
        })
        const res = createMockResponse()

        await handler(req, res)

        assert.strictEqual(res.statusCode, 400)
        assert.deepStrictEqual(res.body, { error: 'Missing required fields' })
      })

      test('rejects a general inquiry missing a name', async () => {
        const req = createMockRequest({
          email: 'john@example.com',
          message: 'General inquiry with missing name.',
        })
        const res = createMockResponse()

        await handler(req, res)

        assert.strictEqual(res.statusCode, 400)
        assert.deepStrictEqual(res.body, { error: 'Missing required fields' })
      })

      test('rejects a general inquiry missing an email', async () => {
        const req = createMockRequest({
          name: 'John Smith',
          message: 'General inquiry with missing email.',
        })
        const res = createMockResponse()

        await handler(req, res)

        assert.strictEqual(res.statusCode, 400)
        assert.deepStrictEqual(res.body, { error: 'Missing required fields' })
      })

      test('rejects a request with an empty body', async () => {
        const req = createMockRequest({})
        const res = createMockResponse()

        await handler(req, res)

        assert.strictEqual(res.statusCode, 400)
        assert.deepStrictEqual(res.body, { error: 'Missing required fields' })
      })

      test('rejects a request with undefined body', async () => {
        const req = createMockRequest(undefined)
        const res = createMockResponse()

        await handler(req, res)

        assert.strictEqual(res.statusCode, 400)
        assert.deepStrictEqual(res.body, { error: 'Missing required fields' })
      })
    })
  }

  describe('Vercel-specific HTTP protocol behaviour', () => {
    test('rejects non-POST HTTP methods with 405', async () => {
      const req = createMockRequest({}, 'GET')
      const res = createMockResponse()

      await vercelContactHandler(req, res)

      assert.strictEqual(res.statusCode, 405)
      assert.deepStrictEqual(res.body, { error: 'Method not allowed' })
    })

    test('handles OPTIONS preflight with 200 and CORS headers', async () => {
      const req = createMockRequest({}, 'OPTIONS')
      const res = createMockResponse()

      await vercelContactHandler(req, res)

      assert.strictEqual(res.statusCode, 200)
      assert.strictEqual(res.headers['Access-Control-Allow-Origin'], '*')
      assert.strictEqual(res.headers['Access-Control-Allow-Methods'], 'POST, OPTIONS')
    })
  })
})
