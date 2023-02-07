import { Router } from 'express'
import User from '../controllers/user'
import verifyToken from '../middleware/authMiddleware'

const router = Router()

const user = new User()

router.get('/', user.fetchUsers)
  
router.get('/:userId', user.fetchUser) 

router.post('/', user.registerUser)

router.post('/login', user.loginUser)

router.post('/welcome', verifyToken, user.welcomeUser)


export default router