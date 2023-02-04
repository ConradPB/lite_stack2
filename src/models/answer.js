import mongoose from 'mongoose'


const Schema = mongoose.Schema

const answerSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Question'
    },
    votes: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }

  },
  
  { timestamps: true },
)

const Answer = mongoose.model('Answer', answerSchema)

export default Answer