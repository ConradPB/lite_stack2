import Answer from "../models/answer"
class Question {
    async fetchQuestions (req,res) {
        const questions = await req.context.models.Question.find()
        return res.status(200).json({ questions, })

    }

    async fetchQuestion (req,res) {

        const question = await req.context.models.Question.findById(req.params.questionId).populate({ 
            path: 'answers',
            model: Answer                                                        
        })
        .exec()
        return res.status(200).json({ question })
    }

    async createQuestion (req,res,next) {
        const question = await req.context.models.Question.create({
            text: req.body.text,
            userId: req.context.me.id
  }).catch((error) => {
    error.statusCode = 400;
    next(error)
  })
  return res.status(200).json(question)
    }

    async updateQuestion (req,res) {
        const question = await req.context.models.Question.findById(req.params.questionId)

        if (question) {
            await question.updateOne({
                text:req.body.text,
                userId: req.context.me.id
            })
            return res.status(200).json(question)
          } else {
            return res.status(404).json({ message: 'Question not found' })
          }
    }

    async deleteQuestion (req,res) {
        const question = await req.context.models.Question.findById(req.params.questionId)
        
        if (question)
          await question.remove()
          return res.status(200).json(question)
    }

   
}

export default Question
