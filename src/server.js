import { v4 as uuidv4 } from 'uuid'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  req.me = users[1]
  next();
})

app.get('/users', (req, res) => {
  return res.send(Object.values(users))
  })

app.get('/users/:userId', (req, res) => {
  return res.send(users[req.params.userId])
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
    return res.send(Object.values(questions))
    })
  
  app.get('/questions/:questionId', (req, res) => {
    return res.send(questions[req.params.questionId])
    })

  app.post('/questions', (req, res) => {
  const id = uuidv4();
  const question = {
    id,
    text: req.body.text,
    userId: req.me.id
  };

  questions[id] = question;

  return res.send(question);
})

router.delete('/:questionId', (req, res) => {
  const {
    [req.params.questionId]: question,
    ...otherQuestions
  } = req.context.models.questions;

  req.context.models.questions = otherQuestions;

  return res.send(question);
})
  
app.get('/answers', (req, res) => {
  return res.send(Object.values(answers))
  })

app.get('/answers/:answerId', (req, res) => {
  return res.send(answers[req.params.answerId])
  })

app.post('/answers', (req, res) => {
const id = uuidv4();
const answer = {
  id,
  text: req.body.text,
  userId: req.me.id
};

answers[id] = answer

return res.send(answer)
})

router.delete('/:answerId', (req, res) => {
  const {
    [req.params.answerId]: answer,
    ...otherMessages
  } = req.context.models.answers

  req.context.models.answers = otherAnswers;

  return res.send(answer);
})

    

  let users = {
    1: {
      id: '1',
      username: 'Conrad P.B',
    },
    2: {
      id: '2',
      username: 'Tia reed',
    },
    3: {
      id: '3',
      username: 'Sofi trey',
    },
  };
  
  let questions = {
    1: {
      id: '1',
      text: 'Hello all, How u today?',
      userId: '1',
    },
    2: {
      id: '2',
      text: 'Whats the weather like outside?',
      userId: '2',
    },
    3: {
      id: '3',
      text: 'So, shall we go?',
      userId: '3',
    },
  };

  let answers = {
    1: {
      id: '1',
      text: 'Hi, we gud',
      userId: '1',
    },
    2: {
      id: '2',
      text: 'Itsss all gooodd brahh, weathers fine!!',
      userId: '2',
    },
    3: {
      id: '3',
      text: 'Ya.. Lets go.. will be dark soon',
      userId: '3',
    },
  }

app.listen(process.env.PORT, () =>
  console.log(`app is ready and listening on port ${process.env.PORT}!`),
)
