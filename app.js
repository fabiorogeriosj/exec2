const moment = require('moment')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const users = require('./controllers/users')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('API rodando...')
})

app.get('/users', async (req, res) => {
  res.json(await users.getAll())
})

app.post('/users', async (req, res) => {
  try {
    res.json(await users.createItem(req.body))
  } catch (error) {
    res.send(error.message)
  }
})

app.delete('/users', async (req, res) => {
  try {
    res.json(await users.deleteItem(req.body.id))
  } catch (error) {
    res.send(error.message)
  }
})

app.get('/users/:id', async (req, res) => {
  res.json(await users.getItem(req.params.id))
})

app.put('/users', async (req, res) => {
  res.json(await users.updateItem(req.body))
})

app.listen(process.env.PORT || 3000, () => console.log(`API rodando na porta ${process.env.PORT || 3000}`))
