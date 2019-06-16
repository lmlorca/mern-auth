const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const Email = require('./models/Email')

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

app.post('/seed/', (req, res) => {
  const emails = [
    new Email({
      email: 'luismlorca@gmail.com'
    }),
    new Email({
      email: 'llorca@truenorthcorporation.com'
    })
  ]
  Email.deleteMany(null, err => {
    if (err) console.log(err)
  })
  Email.insertMany(emails, (err, emails) => {
    if (err) console.log(err)
    else res.status(200).json(emails)
  })
})

app.use(passport.initialize())
require('./config/passport')

app.use('/api/users/', require('./routes/users-route'))

/***/

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
