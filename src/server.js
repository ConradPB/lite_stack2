import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import models from './models'
import routes from './routes'

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  }
  next()
})
app.use('/session', routes.session)
app.use('/users', routes.user)
app.use('/questions', routes.question)
app.use('/answers', routes.answer)




app.listen(process.env.PORT, () =>
  console.log(`app is ready and listening on port ${process.env.PORT}!`),
)
