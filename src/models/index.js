import mongoose from 'mongoose'

import User from './user'
import Question from './question'
import Answer from './answer'
import env from '../../config/dev.env'

const connectDb = () => {
  return mongoose.connect(env.MONGO_URI);
}
mongoose.set('strictQuery', true) //enables strict query mode in mongoDB


const models = { User, Question, Answer };

export { connectDb }

export default models