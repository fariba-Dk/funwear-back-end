const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortid = require('shortid')

const app = express();
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/react-funwear-shop', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//product model
const Product = mongoose.model(
  "products",
  new mongoose.Schema({ //bunch of columns
    _id: {type:String, default: shortid.generate},
    title: String,
    description: String,
    image: String,
    availableSizes: [String],
    price: Number,
  })
);

//GET - method
app.get("/api/products", async(req, res)=>{
  const products = await Product.find({})
  res.send(products)
})

//POST - method
app.post("/api/products", async(req, res)=>{
  const newProduct = await new Product(req.body).save()
  res.send(newProduct)
})

//DELETE
app.delete("/api/products/:id", async (req, res) =>{
  const deletedProduct = await Product.findByIdAndDelete(req.params.id)
  res.send(deletedProduct)
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("Server at http://localhost:5000")
})

