import express from "express";
// import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from "mongoose";
// import { Book } from "../backend/models/bookModel.js"
import booksRoute from "./routes/booksRoute.js"
// const cors = require('cors');
import cors from "cors";



const PORT = process.env.port || 5000;

const app = express();

//middleware
app.use(express.json());
// app.use(cors());

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.get('/', (req, res) => {
  // console.log(req);
  return res.status(234).send("Welcome to the Backend of Book store")
});

app.use('/books', booksRoute)

///////


const mongoDBURL = "mongodb+srv://book-store:XB4jnFnWQrpO1gbe@cluster0.hidmqma.mongodb.net/?retryWrites=true&w=majority";
console.log(mongoDBURL);




mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error)
  });

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);








