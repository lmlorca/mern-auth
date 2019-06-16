const validator = require('validator')

function validateRegister(data) {
  let errors = {}

  if (validator.isEmpty('' + data.name)) errors.name = 'Name is equired'

  if (validator.isEmpty('' + data.email)) errors.email = 'Email is required'
  else if (!validator.isEmail('' + data.email))
    errors.email = 'Email is invalid'

  if (validator.isEmpty('' + data.password))
    errors.password = 'Password is required'
  if (validator.isEmpty('' + data.password2))
    errors.password2 = 'Must confirm password'
  if (!validator.isLength('' + data.password, { min: 6, max: 30 }))
    errors.password = 'Password must be at least 6 characters'
  if (!validator.equals('' + data.password, '' + data.password2))
    errors.password2 = 'Passwords must match'

  return {
    errors,
    isValid: Object.entries(errors).length === 0
  }
}

module.exports = validateRegister
