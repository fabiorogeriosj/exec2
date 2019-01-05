const { Pool } = require('pg')
const MongoClient = require('mongodb').MongoClient
// Connection url
const url = 'mongodb://admin:senha10@ds157499.mlab.com:57499/dbfabio'
// Database Name
const dbName = 'dbfabio'

const pool = {}

MongoClient.connect(url, (err, client) => {
  if (err) return err
  next(client)
})
var index = 1
var max = 5000000
const next = (client) => {
  client.db(dbName).collection('usuarios').insert({ nome: `Usuario demo ${index}` }, function (err, data) {
    if (err) console.log(`Não foi possível inserir ${index}!`)
    console.log(`Inseriu ${index}`)
    index++
    if (index < max) {
      next(client)
    } else {
      console.log('CAbo!')
    }
  })
}

// pool.connect()

const createItem = async (user) => {
  return user
}

const getAll = async () => {
  const res = await pool.query('select * from pessoa')
  return res.rows
}

const getItem = async (id) => {
  const res = await pool.query('select * from pessoa where id=$1', [id])
  return res.rows[0]
}

const deleteItem = (id) => {
  return pool.query('delete from pessoa where id=$1', [id])
}

const updateItem = (user) => {
  return pool.query('update pessoa set nome=$1, email=$2, fone=$3 where id=$4)', [user.nome, user.email, user.fone, user.id])
}
module.exports = {
  createItem, getAll, getItem, deleteItem, updateItem
}
