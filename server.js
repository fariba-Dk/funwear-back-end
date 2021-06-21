const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const app = express();

app.use(bodyParser); //deprecated

mongoose.connect('mongodb://localhost/react-funwear-shop', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//product model
const Product = mongoose.model(
  'products',
  new mongoose.Schema({
    _id: { type: shortid.generate }, //it create an id for new added product
    title: String,
    description: String,
    image: String,
    availableSizes: [String],
    price: Number

  })
);
