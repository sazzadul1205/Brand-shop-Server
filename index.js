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
    const UserCollection = client.db('productDB').collection('user');


    // view all products
    app.get('/product', async (req, res) => {
      const cursor = ProductCollection.find()
      const result = await cursor.toArray()
      res.send(result);
    })

    // view product by id
    app.get('/product/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await ProductCollection.findOne(query)
      res.send(result);
    })

    // insert a item to DB
    app.post('/product', async (req, res) => {
      const newCoffee = req.body;
      const result = await ProductCollection.insertOne(newCoffee);
      res.send(result);
    })
    // Update a Product
    app.put('/product/:id', async (req, res) => {
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

    // delete product
    app.delete('/product/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await ProductCollection.deleteOne(query);
      res.send(result);
    })




    // user section

    // view all users
    app.get('/user', async (req, res) => {
      const cursor = UserCollection.find()
      const result = await cursor.toArray()
      res.send(result);
    })

    // view a individual user
    app.get('/user/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await UserCollection.findOne(query);
      res.send(result);
    })

    // app.put('/user/:id', async (req, res) => {
    //   const email = req.params.id;
    //   const filter = { email: email };
    //   const options = { upsert: true };
    //   const updatedProduct = req.body;

    //   const updatedDoc = {
    //     $set: {
    //       updatedProduct 

    //     }
    //   };
    //   const result = await UserCollection.updateOne(filter, updatedDoc , options );

    //   res.send(result);
    // });

    app.put('/user/:id', async (req, res) => {
      try {
        const email = req.params.id;
        const filter = { email: email };
        const existingUser = await UserCollection.findOne(filter);

        // If the user doesn't exist, create a new cart for the user
        if (!existingUser) {
          const newUser = {
            email: email,
            cart: [req.body] // Add the new product to the cart
          };
          await UserCollection.insertOne(newUser);
          res.send({ message: 'User created with the new product.' });
        } else {
          // If the user already has a cart, update the cart with the new product
          const updatedCart = [...existingUser.cart, req.body];
          const updatedDoc = {
            $set: {
              cart: updatedCart
            }
          };
          const result = await UserCollection.updateOne(filter, updatedDoc);
          res.send({ message: 'Product added to the cart successfully.' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });



    // create a new user
    app.post('/user', async (req, res) => {
      const newUser = req.body;
      const result = await UserCollection.insertOne(newUser);
      res.send(result);
    })

    // modify/Update a user
    app.patch('/user', async (req, res) => {
      const email = req.body.email;
      const filter = { email: email };
      const user = req.body;
      const updatedDoc = {
        $set: {
          lastLoggedAt: user.lastLoggedAt,
        }
      };
      const result = await UserCollection.updateOne(filter, updatedDoc);
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
