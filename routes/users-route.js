const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const validateRegister = require('../validation/register')
const validateLogin = require('../validation/login')

require('dotenv').config()

const User = require('../models/User')
const Email = require('../models/Email')

/*
@route POST /api/users/register
@desc Register user
*/

router.post('/register/', (req, res) => {
  const { errors, isValid } = validateRegister(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Email.findOne({ email: req.body.email }).then(email => {
    if (!email) {
      return res.status(400).json({
        emailNotValid: req.body.email + ' was not found in our database'
      })
    } else {
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          return res.status(400).json({ email: 'Email already exists' })
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email
          })

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err
              newUser.password = hash
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err))
            })
          })
        }
      })
    }
  })
})

/*
@route POST /api/users/login
@desc Logs user in
*/
router.post('/login/', (req, res) => {
  const { errors, isValid } = validateLogin(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { email, password } = req.body

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailNotFount: 'Email not found' })
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        }
        jwt.sign(
          payload,
          process.env.secretOrKey,
          { expiresIn: 31556926 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          }
        )
      } else {
        return res.status(400).json({ passwordIncorrect: 'Password Incorrect' })
      }
    })
  })
})

module.exports = router
