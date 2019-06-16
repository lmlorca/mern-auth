const validator = require('validator')
const isEmpty = require('is-empty')

function validateLogin(data) {
  let errors = {}

  if (validator.isEmpty('' + data.email)) errors.email = 'Email is required'
  else if (!validator.isEmail('' + data.email)) error.email = 'Email is invalid'
  if (validator.isEmpty('' + data.password))
    errors.password = 'Password is required'

  return {
    errors,
    isValid: Object.entries(errors).length === 0
  }
}

module.exports = validateLogin
