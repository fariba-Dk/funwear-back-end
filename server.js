const express = require('express')
const mongoose = require('mongoose');
const shortid = require('shortid');

const app = express()
//middlewares
app.use(express.json())

//initialize mongo-db
//2 params for connect func: url, 3 15multiple keys 12-
 mongoose.connect('mongodb://localhost/react-funwear-shop', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// //product model -> the model w 2 params: name of the collection in the db 2. the list of fields of the model
const Product = mongoose.model(
  "products",
  new mongoose.Schema({ //bunch of columns
    _id: {type:String, default: shortid.generate},//we set default value
    title: String,
    description: String,
    image: String,
    availableSizes: [String],
    price: Number,
  })
);

//GET - method
app.get("/api/products", async(req, res)=>{
  //find is a promise so use async/await
  const products = await Product.find({})
  console.log(products)
  res.send(products)
})

// //POST - method
app.post("/api/products", async(req, res)=>{
  const newProduct = await new Product(req.body).save()
  res.send(newProduct)
})

// //UPDATE - method
// app.put("/api/products/:id", async(req, res) =>{
//   const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
//   res.json(updatedProduct)
// })

//DELETE  using :id as placeholder
app.delete("/api/products/:id", async (req, res) =>{
  const deletedProduct = await Product.findByIdAndDelete(req.params.id)
  res.send(deletedProduct)
})



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("Server at http://localhost:5000")
})

