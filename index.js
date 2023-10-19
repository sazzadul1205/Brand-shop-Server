const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@brand-shop-server.zab0nqb.mongodb.net/?retryWrites=true&w=majority`;

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


    // insert a item to DB
    app.post('/product', async (req, res) => {
      const newCoffee = req.body;
      const result = await ProductCollection.insertOne(newCoffee);
      res.send(result);
    })






    // view brands
    // samsung
    app.get('/product/samsung', async (req, res) => {
      const cursor = ProductCollection.find();
      const result = await cursor.toArray();
      const samsungProducts = result.filter(product => product.brand == 'Samsung');
      res.send(samsungProducts);
    });
    // Apple
    app.get('/product/apple', async (req, res) => {
      const cursor = ProductCollection.find();
      const result = await cursor.toArray();
      const appleProducts = result.filter(product => product.brand == 'Apple');
      res.send(appleProducts);
    });
    // Asus
    app.get('/product/asus', async (req, res) => {
      const cursor = ProductCollection.find();
      const result = await cursor.toArray();
      const asusProducts = result.filter(product => product.brand == 'Asus');
      res.send(asusProducts);
    });
    // Oppo
    app.get('/product/oppo', async (req, res) => {
      const cursor = ProductCollection.find();
      const result = await cursor.toArray();
      const oppoProducts = result.filter(product => product.brand == 'Oppo');
      res.send(oppoProducts);
    });
    // Nokia
    app.get('/product/nokia', async (req, res) => {
      const cursor = ProductCollection.find();
      const result = await cursor.toArray();
      const NokiaProducts = result.filter(product => product.brand == 'Nokia');
      res.send(NokiaProducts);
    });
    // Nokia
    app.get('/product/intel', async (req, res) => {
      const cursor = ProductCollection.find();
      const result = await cursor.toArray();
      const IntelProducts = result.filter(product => product.brand == 'intel');
      res.send(IntelProducts);
    });

    // products
    app.get('/product/samsung/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await ProductCollection.findOne(query)
      res.send(result);
    })
    app.get('/product/apple/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await ProductCollection.findOne(query)
      res.send(result);
    })
    app.get('/product/oppo/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await ProductCollection.findOne(query)
      res.send(result);
    })
    app.get('/product/asus/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await ProductCollection.findOne(query)
      res.send(result);
    })
    app.get('/product/intel/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await ProductCollection.findOne(query)
      res.send(result);
    })
    app.get('/product/nokia/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await ProductCollection.findOne(query)
      res.send(result);
    })

    // Update a Product
    app.put('/product/samsung/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedProduct = req.body;
      const samsung = {
        $set: {
          name: updatedProduct.name,
          brand: updatedProduct.brand,
          type: updatedProduct.type,
          price: updatedProduct.price,
          rating: updatedProduct.rating,
          supply: updatedProduct.supply,
          description: updatedProduct.description,
          photo: updatedProduct.photo,
          ram: updatedProduct.ram,
          rom: updatedProduct.rom,
          battery: updatedProduct.battery,
          display: updatedProduct.display,

        }
      };
      const result = await ProductCollection.updateOne(filter, samsung, options);
      res.send(result);
    });
    // 
    app.put('/product/apple/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedProduct = req.body;
      const samsung = {
        $set: {
          name: updatedProduct.name,
          brand: updatedProduct.brand,
          type: updatedProduct.type,
          price: updatedProduct.price,
          rating: updatedProduct.rating,
          supply: updatedProduct.supply,
          description: updatedProduct.description,
          photo: updatedProduct.photo,
          ram: updatedProduct.ram,
          rom: updatedProduct.rom,
          battery: updatedProduct.battery,
          display: updatedProduct.display,

        }
      };
      const result = await ProductCollection.updateOne(filter, samsung, options);
      res.send(result);
    });
    // 
    app.put('/product/oppo/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedProduct = req.body;
      const samsung = {
        $set: {
          name: updatedProduct.name,
          brand: updatedProduct.brand,
          type: updatedProduct.type,
          price: updatedProduct.price,
          rating: updatedProduct.rating,
          supply: updatedProduct.supply,
          description: updatedProduct.description,
          photo: updatedProduct.photo,
          ram: updatedProduct.ram,
          rom: updatedProduct.rom,
          battery: updatedProduct.battery,
          display: updatedProduct.display,

        }
      };
      const result = await ProductCollection.updateOne(filter, samsung, options);
      res.send(result);
    });
    // 
    app.put('/product/asus/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedProduct = req.body;
      const samsung = {
        $set: {
          name: updatedProduct.name,
          brand: updatedProduct.brand,
          type: updatedProduct.type,
          price: updatedProduct.price,
          rating: updatedProduct.rating,
          supply: updatedProduct.supply,
          description: updatedProduct.description,
          photo: updatedProduct.photo,
          ram: updatedProduct.ram,
          rom: updatedProduct.rom,
          battery: updatedProduct.battery,
          display: updatedProduct.display,

        }
      };
      const result = await ProductCollection.updateOne(filter, samsung, options);
      res.send(result);
    });
    // 
    app.put('/product/intel/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedProduct = req.body;
      const samsung = {
        $set: {
          name: updatedProduct.name,
          brand: updatedProduct.brand,
          type: updatedProduct.type,
          price: updatedProduct.price,
          rating: updatedProduct.rating,
          supply: updatedProduct.supply,
          description: updatedProduct.description,
          photo: updatedProduct.photo,
          ram: updatedProduct.ram,
          rom: updatedProduct.rom,
          battery: updatedProduct.battery,
          display: updatedProduct.display,

        }
      };
      const result = await ProductCollection.updateOne(filter, samsung, options);
      res.send(result);
    });
    // 
    app.put('/product/nokia/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedProduct = req.body;
      const samsung = {
        $set: {
          name: updatedProduct.name,
          brand: updatedProduct.brand,
          type: updatedProduct.type,
          price: updatedProduct.price,
          rating: updatedProduct.rating,
          supply: updatedProduct.supply,
          description: updatedProduct.description,
          photo: updatedProduct.photo,
          ram: updatedProduct.ram,
          rom: updatedProduct.rom,
          battery: updatedProduct.battery,
          display: updatedProduct.display,

        }
      };
      const result = await ProductCollection.updateOne(filter, samsung, options);
      res.send(result);
    });


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
