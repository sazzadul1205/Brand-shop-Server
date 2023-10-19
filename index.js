const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@brand-shop.n91hcdj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // database 
    const ProductCollection = client.db('productDB').collection('product');

    // view all products
    app.get('/product', async (req, res) => {
        const cursor = ProductCollection.find()
        const result = await cursor.toArray()
        res.send(result);
    })

    // view individual products
    app.get('/product/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const result = await ProductCollection.findOne(query)
        res.send(result);
    })

    // upload a item to DB
    app.post('/product', async (req, res) => {
        const newCoffee = req.body;
        const result = await ProductCollection.insertOne(newCoffee);
        res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// Set up the basic route
app.get('/', (req, res) => {
    res.send('Brand Server is Running');
});

// Listen on the specified port
app.listen(port, () => {
    console.log(`Brand Server is Running on Port: ${port}`);
});
