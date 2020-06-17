const mongoose = require('mongoose')

const candleSchema = mongoose.Schema({
  name: {type:String, required: true},
  description: {type:String, required: true},
  price: {type: Number, required: true},
  brand: {type:String, required: true},
  likes: {type:Number, default: 0},
  inStock: {type:Boolean, default: true},
  img: {type:String, required: true}
})

module.exports = mongoose.model('Candle', candleSchema)
