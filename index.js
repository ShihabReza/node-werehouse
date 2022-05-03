const express = require('express')

const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const query = require('express/lib/middleware/query');
const app = express()
app.use(cors())
const port = 5000
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