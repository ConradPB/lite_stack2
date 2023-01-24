import { v4 as uuidv4 } from 'uuid'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import models from './models'

const app = express()

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
})

app.get('/session', (req, res) => {
  return res.status(200).json(req.context.models.users[req.context.me.id])
})

app.get('/users', (req, res) => {
  return res.status(200).json(Object.values(req.context.models.users))
  })

app.get('/users/:userId', (req, res) => {
  return res.status(200).json(req.context.models.users[req.params.userId])
  })

app.post('/users', (req, res) => {
  return res.send('POST HTTP method on user resource')
  })

app.put('/users/:userId', (req, res) => {
  return res.send(
    `PUT HTTP method on user/${req.params.userId} resource`,
  )
  })  

app.delete('/users/:userId', (req, res) => {
  return res.send(
    `DLT HTTP method on user/${req.params.userId} resource`,
  )
  })

app.get('/questions', (req, res) => {
    return res.status(200).json(Object.values(req.context.models.questions))
    })
  
app.get('/questions/:questionId', (req, res) => {
    return res.status(200).json(req.context.models.questions[req.params.questionId])
    })

app.post('/questions', (req, res) => {
  const id = uuidv4()
  const question = {
    id,
    text: req.body.text,
    userId: req.context.me.id
  }

  req.context.models.questions[id] = question

  return res.status(200).json(question)
})

app.delete('/questions/:questionId', (req, res) => {
  const {
    [req.params.questionId]: question,
    ...otherQuestions
  } = req.context.models.questions

  req.context.models.questions = otherQuestions;

  return res.status(200).json(question)
})
  
app.get('/answers', (req, res) => {
  return res.status(200).json(Object.values(req.context.models.answers))
  })

app.get('/answers/:answerId', (req, res) => {
  return res.status(200).json(req.context.models.answers[req.params.answerId])
  })

app.post('/answers', (req, res) => {
const id = uuidv4()
const answer = {
  id,
  text: req.body.text,
  userId: req.context.me.id
};

req.context.models.answers[id] = answer

return res.status(200).json(answer)
})

app.delete('/answers/:answerId', (req, res) => {
  const {
    [req.params.answerId]: answer,
    ...otherAnswers
  } = req.context.models.answers

  req.context.models.answers = otherAnswers

  return res.status(200).json(answer)
})



app.listen(process.env.PORT, () =>
  console.log(`app is ready and listening on port ${process.env.PORT}!`),
)
