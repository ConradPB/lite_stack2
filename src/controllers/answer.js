import { v4 as uuidv4 } from 'uuid'

class Answer {
    fetchAnswers (req,res) {
        return res.status(200).json(Object.values(req.context.models.answers))

    }

    fetchAnswer (req,res) {
        return res.status(200).json(req.context.models.answers[req.params.answerId])

    }

    createAnswer (req,res) {
        const id = uuidv4()
        const answer = {
            id,
            text: req.body.text,
            userId: req.context.me.id
  }
  
  req.context.models.answers[id] = answer
  
  return res.status(200).json(answer)
    }

    updateAnswer (req,res) {
        
        const answer =  req.context.models.answers[req.params.answerId]

        if (answer) {
            answer.text = req.body.text;
            answer.userId = req.context.me.id;
            return res.status(200).json(answer)
          } else {
            return res.status(404).json({ message: 'Answer not found' })
          }

    }

    deleteAnswer (req,res) {
        const {
            [req.params.answerId]: answer,
            ...otherAnswers
          } = req.context.models.answers
        
          req.context.models.answers = otherAnswers
        
          return res.status(200).json(answer)
    }
}

export default Answer
