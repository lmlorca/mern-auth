const router = require('express').Router()
const Stuff = require('../models/stuff-model')

/* Seed */
router.post('/seed/', (req, res, next) => {
  console.log('aaa')
  let stuffs = [
    new Stuff({
      name: 'Una cosa',
      price: 10.25
    }),
    new Stuff({
      name: 'Otra cosa',
      price: 12.25
    }),
    new Stuff({
      name: 'Otra cosa más'
    })
  ]
  Stuff.insertMany(stuffs, (err, stuffs) => {
    if (err) console.log(err)
  })
  res.send('Succesfully seeded')
})

/*  get /stuffs - gets all stuffs */
router.get('/', (req, res, next) => {
  Stuff.find(null, (err, stuffs) => {
    if (err) next(err)
    else res.json(stuffs)
  })
})

module.exports = router
