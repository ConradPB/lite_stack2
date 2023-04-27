
import dotenv from 'dotenv';
dotenv.config({ path: './test.env' });
import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';
import env from '../config/test.env';
import models from '../src/models';

let me;

jest.setTimeout(40000);

async function seedDatabase() {
  // Insert data into the questions collection
  await models.Question.create([{
    text: 'Hi guyz, How u today?'
    },
    {
    text: 'Hows your day goin??'
      },
      {
    text: 'Hey, wheres Jake?'
        },
      {
    text: 'Hey yall see this weather? Climate changes real yo'
        }

    ]);
  
  await models.Answer.create([
    { text: 'We good. Good. Happy to see you bruh..' },
    { text: 'Ya. climate change. Like we didnt have enaff to worry about already' },
    { text: 'yeah, we just peachy..' },
    { text: 'the days well, goin. Got no idea where Jake is. Lets call him.' }

  ]);  

  await models.User.create([
    { 
    email: 'abc1@gmail.com',
    password: 'abc',
    username: 'Conrad P.B',
    last_name: 'P.B',
    first_name: 'Conrad'
   },
    { 
    email: 'abc2@gmail.com',
    password: 'def',
    username: 'Tia Reed',
    last_name: 'Reed',
    first_name: 'Tia'},
    { 
    email: 'abc3@gmail.com',
    password: 'ghi',
    username: 'Sofie Einer',
    last_name: 'Einer',
    first_name: 'Sofie',}
  ])

  // Insert data into other collections as needed
  // ...
}

beforeEach(async () => {
  await mongoose.connect(env.MONGO_URI2);
  me = await models.User.findById('Conrad P.B');
  console.log(me);

  await seedDatabase();
  console.log(await models.User.find({}))
  // Seed the test database with data from the server database
  const [user1, user2, user3, question1, question2, question3, question4, answer1, answer2, answer3, answer4] = await Promise.all([
    models.User.findOne({ 
    email: 'abc1@gmail.com',
    password: 'abc',
    username: 'Conrad P.B',
    last_name: 'P.B',
    first_name: 'Conrad'
  }),
    models.User.findOne({ 
    email: 'abc2@gmail.com', 
    password: 'def',
    username: 'Tia Reed',
    last_name: 'Reed',
    first_name: 'Tia'}),
    models.User.findOne({ email: 'abc3@gmail.com',
    password: 'ghi',
    username: 'Sofie Einer',
    last_name: 'Einer',
    first_name: 'Sofie',
   }),
    models.Question.findOne({ text: 'Hi guyz, How u today?' }),
    models.Question.findOne({ text: 'Hows your day goin??' }),
    models.Question.findOne({ text: 'Hey, wheres Jake?' }),
    models.Question.findOne({ text: 'Hey yall see this weather? Climate changes real yo' }),
    models.Answer.findOne({ text: 'We good. Good. Happy to see you bruh..' }),
    models.Answer.findOne({ text: 'Ya. climate change. Like we didnt have enaff to worry about already' }),
    models.Answer.findOne({ text: 'yeah, we just peachy..' }),
    models.Answer.findOne({ text: 'the days well, goin. Got no idea where Jake is. Lets call him.' }),
  ]);

  if (!user1) console.log('user1 is null');
  if (!user2) console.log('user2 is null');
  if (!user3) console.log('user3 is null');
  if (!question1) console.log('question1 is null');
  if (!question2) console.log('question2 is null');
  if (!question3) console.log('question3 is null');
  if (!question4) console.log('question4 is null');
  if (!answer1) console.log('answer1 is null');
  if (!answer2) console.log('answer2 is null');
  if (!answer3) console.log('answer3 is null');
  if (!answer4) console.log('answer4 is null');

  console.log('question1:', question1);
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Test the root path', () => {
  test('It should respond to the GET method', async () => {
    const res = await request(app).get('/questions').set('x-me-id', me._id);
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });
});