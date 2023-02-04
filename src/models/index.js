import mongoose from 'mongoose'

import User from './user'
import Question from './question'
import Answer from './answer'

const connectDb = () => {
  return mongoose.connect(process.env.MONGO_URI);
}

const models = { User, Question, Answer };

export { connectDb }

export default models