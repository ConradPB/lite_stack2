import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).json(req.context.models.users[req.context.me.id])
  })

export default router