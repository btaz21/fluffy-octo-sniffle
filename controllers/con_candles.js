const express = require('express')
const router = express.Router()
const Candles = require('../models/candles.js')


//INDEX
router.get('/', (req, res) => {
  Candles.find({}, (error, foundCandle) => {
    res.json(foundCandle)
  }).sort({likes: 'desc'})
})


//CREATE
router.post('/', (req, res) => {
  Candles.create(req.body, (error, createdCandle) => {
    res.json(createdCandle)
  })
})

//DELETE
router.delete('/:id', (req, res) => {
  Candles.findByIdAndRemove(req.params.id, (error, deletedCandle) => {
    res.json(deletedCandle)
  })
})


//EDIT
router.put('/:id', (req, res) => {
  Candles.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, editedCandle) => {
    res.json(editedCandle)
  })
})

//EDIT LIKES
router.put('/likes/:id', (req, res) => {
  console.log(req.params.id);
  Candles.findByIdAndUpdate(req.params.id, {$inc: {'likes': + 1}}, {new:true}, (error, foundCandle) => {
    res.json(foundCandle)
  })
})



module.exports = router
