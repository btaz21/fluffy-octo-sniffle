const express = require('express');
const mongoose = require('mongoose')
const app = express();
const db = mongoose.connection

// Middleware
app.use(express.json())// returns middleware that only parses JSON
app.use(express.static('public'))

// Connect to Mongo
mongoose.connect('mongodb://localhost:27017/luxurycandleshop', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('MongoDB connection established:', 'mongodb://localhost:27017/luxurycandleshop')
)

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))


const candlesController = require('./controllers/con_candles.js')
app.use('/candles', candlesController)


//listener
app.listen(3000, () => {
  console.log('listening...');
})
