import request from 'supertest'
import app from '../src/app'
jest.setTimeout(10000);



describe('Test the root path', () => {
    test('It should respond to the GET method', async () => {
      const response = await request(app).get('/')
      expect(response.statusCode).toBe(200)
    })
  })
  