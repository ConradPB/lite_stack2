import { v4 as uuidv4 } from 'uuid'


class Question {
    fetchQuestions (req,res) {
        return res.status(200).json(Object.values(req.context.models.questions))

    }

    fetchQuestion (req,res) {
        return res.status(200).json(req.context.models.questions[req.params.questionId])
    }

    createQuestion (req,res) {
        const id = uuidv4()
        const question = {
            id,
            text: req.body.text,
            userId: req.context.me.id
  }
  req.context.models.questions[id] = question
  
  return res.status(200).json(question)
    }

    updateQuestion (req,res) {
        const question =  req.context.models.questions[req.params.questionId]

        if (question) {
            question.text = req.body.text
            question.userId = req.context.me.id
            return res.status(200).json(question)
          } else {
            return res.status(404).json({ message: 'Question not found' })
          }
    }

    deleteQuestion (req,res) {
        const {
            [req.params.questionId]: question,
            ...otherQuestions
          } = req.context.models.questions
          
          req.context.models.questions = otherQuestions
          
          return res.status(200).json(question)
    }
}

export default Question
