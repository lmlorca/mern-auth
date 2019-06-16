const { Schema, model } = require('mongoose')

const emailListSchema = new Schema({
  emails: Array
})

const EmailsList = model('EmailsList', emailListSchema)
module.exports = EmailsList
