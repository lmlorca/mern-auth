const { Schema, model } = require('mongoose')

const EmailSchema = new Schema({
  email: String
})

module.exports = model('Email', EmailSchema)
