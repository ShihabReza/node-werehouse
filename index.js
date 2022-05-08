const express = require('express')

const cors = require('cors')
const { MongoClient, ServerApiVersion , ObjectId } = require('mongodb');
require('dotenv').config()
const query = require('express/lib/middleware/query');
const app = express()
app.use(cors())
const port = process.env.PORT || 5000
app.use(express.json())






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.exlpt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("werehouse").collection("product");

//   console.log('db-conected')
//   // perform actions on the collection object
//   client.close();
// });


async function run() {
  try {
    await client.connect();
    const productCollection = await client.db("warehouse").collection('product')
    app.get('/product',async (req, res) => {
      const query = {}
      const cursor = productCollection.find(query)
      const products =await cursor.toArray()
      res.send(products)
      
    })
    app.get('/product/:id',async (req, res) => {
      const id = req.params.id
      const query = {_id: ObjectId(id)}
      const product = await productCollection.findOne(query)
      res.send(product)
    })

    app.post('/product',async (req, res) => {
      const newProduct = req.body;
      const result = await productCollection.insertOne(newProduct)
      res.send(result)
    })
  } finally {
    
  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Updete Node')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})