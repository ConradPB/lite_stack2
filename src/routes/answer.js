import { Router } from 'express'
import Answer from '../controllers/answer'

const router = Router()

const answer = new Answer()
  
router.get('/', answer.fetchAnswers)
  
router.get('/:answerId', answer.fetchAnswer)
  
router.post('/', answer.createAnswer)

router.put('/:answerId', answer.updateAnswer)
  
router.delete('/:answerId', answer.deleteAnswer)

export default router