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

  app.get('/messages', (req, res) => {
    return res.send(Object.values(messages))
    })
  
  app.get('/messages/:messageId', (req, res) => {
    return res.send(messages[req.params.messageId])
    })

  app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id
  };

  messages[id] = message;

  return res.send(message);
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
  };
  
  let messages = {
    1: {
      id: '1',
      text: 'Hello all, How u today?',
      userId: '1',
    },
    2: {
      id: '2',
      text: 'Itsss all gooodd brahh!!',
      userId: '2',
    },
  };

app.listen(process.env.PORT, () =>
  console.log(`app is ready and listening on port ${process.env.PORT}!`),
)
