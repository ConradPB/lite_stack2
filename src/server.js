import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes'
import models, { connectDb } from './models'
mongoose.set('strictQuery', true) //enables strict query mode in mongoDB
import errorHandler from './middleware/errorHandler'

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(async(req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('Conrad P.B'),
  }
  next()
})
app.use('/session', routes.session)
app.use('/users', routes.user)
app.use('/questions', routes.question)
app.use('/answers', routes.answer)
app.use('/qna', routes.QnA)
app.use(errorHandler)


const eraseDatabaseOnSync = true

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Question.deleteMany({}),
      models.Answer.deleteMany({}),
    ])
    createUsersWithMessages()
  }


app.listen(process.env.PORT, () =>
  console.log(`app is ready and listening on port ${process.env.PORT}!`),
)
})

const createUsersWithMessages = async () => {
  const user1 = new models.User({
    first_name: 'Conrad',
    last_name: 'P.B',
    username: 'Conrad P.B',
    email: 'abc1@gmail.com',
    password: 'abc'
  })
  const user2 = new models.User({
    first_name: 'Tia',
    last_name: 'Reed',
    username: 'Tia Reed',
    email: 'abc2@gmail.com',
    password: 'def'
  })
  const user3 = new models.User({
    first_name: 'Sofie',
    last_name: 'Einer',
    username: 'Sofie Einer',
    email: 'abc3@gmail.com',
    password: 'ghi'
  })


  const question1 = new models.Question({
    text: 'Hi guyz, How u today?',
    user: user1.id, 

    
  })
  const question2 = new models.Question({
    text: 'Hows your day goin??',
    user: user2.id, 
    
    
  })
  const question3 = new models.Question({
    text: 'Hey, wheres Jake',
    user: user2.id,
    
  })
  const question4 = new models.Question({
    text: 'Hey yall see this weather? Climate changes real yo',
    user: user3.id,
    
  })
  

  const answer1 = new models.Answer({
    text: 'We good. Good. Happy to see you bruh..',
    user: user2,
  })
  const answer2 = new models.Answer({
    text: 'Ya. climate change. Like we didnt have enaff to worry about already',
    user: user2,
  })
  const answer3 = new models.Answer({
    text: 'yeah, we just peachy..',
    user: user3,
  })
  const answer4 = new models.Answer({
    text: 'the days well, goin. Got no idea where Jake is. Lets call him.',
    user: user2,
  })
  

  await question1.save()
  await question2.save()
  await question3.save()
  await question4.save()

  await answer1.save()
  await answer2.save()
  await answer3.save()
  await answer4.save()

  await user1.save()
  await user2.save()
  await user3.save()
}