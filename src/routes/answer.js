import { v4 as uuidv4 } from 'uuid'
import { Router } from 'express'

const router = Router()

  
router.get('/', (req, res) => {
    return res.status(200).json(Object.values(req.context.models.answers))
    })
  
router.get('/:answerId', (req, res) => {
    return res.status(200).json(req.context.models.answers[req.params.answerId])
    })
  
router.post('/', (req, res) => {
  const id = uuidv4()
  const answer = {
    id,
    text: req.body.text,
    userId: req.context.me.id
  };
  
  req.context.models.answers[id] = answer
  
  return res.status(200).json(answer)
  })
  
router.delete('/:answerId', (req, res) => {
    const {
      [req.params.answerId]: answer,
      ...otherAnswers
    } = req.context.models.answers
  
    req.context.models.answers = otherAnswers
  
    return res.status(200).json(answer)
  })

export default router