const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const shortid = require('shortid');
const app = express();
app.use(express.json());

//initialize mongo-db  //2 params for connect func: url, 3 15multiple keys 12-
mongoose.connect(
  process.env.MONGODB_URL || 'mongodb://localhost/react-funwear-shop',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

// //product model -> the model w 2 params: name of the collection in the db 2. the list of fields of the model
const Product = mongoose.model(
  'products',
  new mongoose.Schema({
    //bunch of columns
    _id: { type: String, default: shortid.generate }, //we set default value
    title: String,
    description: String,
    image: String,
    availableSizes: [String],
    price: Number,
  })
);

async function seed() {
  await new Product({
    availableSizes: ['XS', 'M', 'S', 'L'],
    image: '/images/shein10.webp',
    title: 'Elegant sundress with ruched front',
    description:
      'This is for all the latest trends, no matter who you are, where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.',
    price: 408.99,
  }).save();
}
seed();
//GET - method
app.get('/api/products', async (req, res) => {
  //find is a promise so use async/await
  const products = await Product.find({});
  console.log(products);
  res.send(products);
});

// //POST - method
app.post('/api/products', async (req, res) => {
  const newProduct = await new Product(req.body).save();
  res.send(newProduct);
});

//UPDATE - method
app.put('/api/products/:id', async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedProduct);
});

//DELETE  using :id as placeholder
app.delete('/api/products/:id', async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});
//~~~~~~~~ O R D E R   MODEL ~~~~~~~
const Order = mongoose.model(
  'order',
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          // an array of each cartItem which are PRODUCT {}
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      timestamps: true, //allows to see time for update and place
    }
  )
);
//POST method
app.post('/api/orders', async (req, res) => {
  //insure that all required fields exists!!!
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.cartItems ||
    !req.body.total
  ) {
    return res.send({ message: 'Data is required' });
  } else {
    const newOrder = await Order(req.body).save();
    res.send(newOrder);
  }
});

//render static file inside build folder -
//build will be statically in this
app.use('/', express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'build/index.html'))
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server at http://localhost:5000');
});
