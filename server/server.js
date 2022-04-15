const express = require('express')

require('dotenv').config()

const cors = require('cors')

const db = require('./db')

const app = express()

//middlewares
app.use(express.json())
app.use(cors())

//routes
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM restaurants ORDER BY id ASC')
    //const data = results.rows.map(result => result.name)
    res.status(200).json(results.rows)
  } catch (err) {
    console.error(err.message)
  }
})

app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params
    const results = await db.query('SELECT * FROM restaurants WHERE id = $1', [
      id
    ])
    res.status(200).json(results.rows)
  } catch (err) {
    console.error(err.message)
  }
})

app.post('/api/v1/restaurants', async (req, res) => {
  try {
    const { name, location, price_range } = req.body
    const results = await db.query(
      'INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *',
      [name, location, price_range]
    )
    res.status(200).json(results.rows)
  } catch (err) {
    console.error(err.message)
  }
})

app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, location, price_range } = req.body
    const results = await db.query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *',
      [name, location, price_range, id]
    )
    res.status(200).json(results.rows)
  } catch (err) {
    console.error(err.message)
  }
})

app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params
    const results = await db.query(
      'DELETE FROM restaurants WHERE id = $1 RETURNING *',
      [id]
    )
    res.status(200).json(results.rows)
  } catch (err) {
    console.error(err.message)
  }
})

const PORT = process.env.PORT || 8001

app.listen(PORT, () => console.log(`listen on PORT ${PORT}`))
