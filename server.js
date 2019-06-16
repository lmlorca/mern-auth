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
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

/***/

app.use('/stuffs/', require('./routes/stuff-route'))

const EmailsList = require('./models/emails-model')
app.post('/seed-emails/', (req, res, next) => {
  let emails = new EmailsList({
    emails: [
      'luismlorca@gmail.com',
      'llorca@truenorthcorporation.com',
      'llorcatnc@outlook.com'
    ]
  })
  emails.save(null, (err, emails) => {
    if (err) next(err)
    else res.json(emails)
  })
})

/***/

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
