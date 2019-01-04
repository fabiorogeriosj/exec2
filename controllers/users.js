const { Pool } = require('pg')

const pool = {}

// pool.connect()

const createItem = async (user) => {
  return pool.query('insert into pessoa values ($1, $2, $3, $4)', [user.id, user.nome, user.email, user.fone])
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
