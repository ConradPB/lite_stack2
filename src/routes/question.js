import { v4 as uuidv4 } from 'uuid'
import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).json(Object.values(req.context.models.questions))
    })
  
router.get('/:questionId', (req, res) => {
    return res.status(200).json(req.context.models.questions[req.params.questionId])
    })

router.post('/', (req, res) => {
  const id = uuidv4()
  const question = {
    id,
    text: req.body.text,
    userId: req.context.me.id
  }

  req.context.models.questions[id] = question

  return res.status(200).json(question)
})

router.delete('/:questionId', (req, res) => {
  const {
    [req.params.questionId]: question,
    ...otherQuestions
  } = req.context.models.questions

  req.context.models.questions = otherQuestions;

  return res.status(200).json(question)
})


export default router