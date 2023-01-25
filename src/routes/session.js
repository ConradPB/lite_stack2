import { Router } from 'express'
import Session from '../controllers/session'


const router = Router()

const session = new Session()

router.get('/', session.getUser) 

export default router