const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

/***/

require('dotenv').config()
const { DB_NAME, DB_URI, PORT } = process.env

/***/

mongoose
  .connect(DB_URI, { dbName: DB_NAME, useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

/***/

const app = express()

/***/

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

/***/

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
