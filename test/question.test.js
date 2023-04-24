
import dotenv from 'dotenv'
dotenv.config({ path: './test.env' })
import request from 'supertest'
import app from '../src/app'
import mongoose from 'mongoose'
import env from '../config/test.env'
import models from '../src/models'


jest.setTimeout(32000);

beforeEach((done) => {
  mongoose.connect(env.MONGO_URI2,
    
    () => done());
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Test the root path', () => {
  test('It should respond to the GET method', async () => {
      const res = await request(app)
      .get('/questions')
      expect(res.statusCode)
      .toBe(200)
      expect(/json/)   
      
    })
})


describe('POST /questions', () => {
  it('should respond with 200 status code', async () => {
    const res = await request(app)
      .post('/questions')
      .send({ text: 'What is your favorite programming language?' });

    expect(res.status).toEqual(200);
  });

  it('should respond with a question object', async () => {
    const res = await request(app)
      .post('/questions')
      .send({ text: 'What is your favorite programming language?' });

    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('text');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toEqual(null);
    expect(res.body).toHaveProperty('createdAt');
    expect(res.body).toHaveProperty('updatedAt');
  });

  it('should respond with 400 status code if text field is empty', async () => {
    const res = await request(app).post('/questions').send({ text: '' });

    expect(res.status).toEqual(500);
  });
});


describe('PUT /questions/:questionId', () => {
  it('should update a question', async () => {
    const questionId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/questions/${questionId}`)
      .send({
        text: 'Updated question text'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.text).toEqual('Updated question text');
  });

  it('should return 404 if question is not found', async () => {
    const questionId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/questions/${questionId}`)
      .send({
        text: 'Updated question text'
      });
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Question not found');
  });

});