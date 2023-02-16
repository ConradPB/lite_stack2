import request from 'supertest'
import app from '../src/app'
import mongoose from 'mongoose'

jest.setTimeout(10000);

beforeEach((done) => {
  mongoose.connect("mongodb://localhost:27017/JestDB",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Test the root path', () => {
    test('It should respond to the GET method', async () => {
      const response = await request(app).get('/')
      expect(response.statusCode).toBe(200)
    })
})