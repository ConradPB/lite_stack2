import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).json(Object.values(req.context.models.users))
    })
  
router.get('/:userId', (req, res) => {
    return res.status(200).json(req.context.models.users[req.params.userId])
    })

export default router