import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!');
  })

app.post('/', (req, res) => {
    res.send('Here we go nodee uppp! Created msg');
  })

app.put('/', (req, res) => {
    res.send('Here we go nodee uppp! Updated msg');
  })  

app.delete('/', (req, res) => {
    res.send('Here we go nodee uppp! dlt msg');
  })

app.listen(process.env.PORT, () =>
  console.log(`app is ready and listening on port ${process.env.PORT}!`),
)
