import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0
    },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }

  },
  { timestamps: true },
)

questionSchema.methods.addAnswer = function (answerId) {
  this.answers.push(answerId)
  return this.save()
}

questionSchema.pre('remove', async function (next) {
  await this.model('Answer').deleteMany({ _id: { $in: this.answers } })
  next();
})

const Question = mongoose.model('Question', questionSchema)

export default Question