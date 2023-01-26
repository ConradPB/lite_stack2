import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  },
  { timestamps: true },
);

const Question = mongoose.model('Question', questionSchema)

export default Question