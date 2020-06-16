const express = require('express')
const router = express.Router()
const Candles = require('../models/candles.js')


//INDEX
router.get('/', (req, res) => {
  Candles.find({}, (error, foundCandle) => {
    res.json(foundCandle)
  })
})


//CREATE
router.post('/', (req, res) => {
  Candles.create(req.body, (error, createdCandle) => {
    res.json(createdCandle)
  })
})

module.exports = router
