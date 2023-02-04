import { Router } from 'express'

import QnA from '../controllers/QnA'

const router = Router()

const qna = new QnA()

router.get('/', qna.fetchqas)

router.get('/:qnaId', qna.fetchqa)

export default router
