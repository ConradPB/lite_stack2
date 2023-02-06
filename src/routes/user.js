import { Router } from 'express'
import User from '../controllers/user'

const router = Router()

const user = new User()

router.get('/', user.fetchUsers)
  
router.get('/:userId', user.fetchUser) 

router.post('/', user.registerUser)


export default router