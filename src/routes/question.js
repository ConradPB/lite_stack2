import { Router } from 'express'
import Question from '../controllers/question'

const router = Router()

const question = new Question()

router.get('/', question.fetchQuestions)
  
router.get('/:questionId', question.fetchQuestion)

router.post('/', question.createQuestion)

router.put('/:questionId', question.updateQuestion)

router.delete('/:questionId', question.deleteQuestion)


export default router