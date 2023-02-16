import mongoose from 'mongoose'

import User from './user'
import Question from './question'
import Answer from './answer'
import env from '../../config/dev.env'
import testEnv from '../../config/test.env'

const connectDb = async () => {
  const mongoUri = env.NODE_ENV === 'test' ? testEnv.MONGO_URI2 : env.MONGO_URI;
  mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, });
}
mongoose.set('strictQuery', true) //enables strict query mode in mongoDB


const models = { User, Question, Answer };

export { connectDb }

export default models