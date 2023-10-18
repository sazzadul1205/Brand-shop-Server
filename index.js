const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());




app.get('/', (req, res) => {
    res.send('Brand Server is Running');
});

app.listen(port, () => {
    console.log(`Brand Server is Running on Port : ${port}`);
});

// Sazzadul
// dNwgebGO2idkEHM0