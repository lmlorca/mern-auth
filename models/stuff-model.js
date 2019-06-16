const { Schema, model } = require('mongoose')

const stuffSchema = Schema({
  name: { type: String, required: true },
  price: Number
})

const Stuff = model('Stuff', stuffSchema)
module.exports = Stuff
