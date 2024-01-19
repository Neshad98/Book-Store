import express from "express";
// import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from "mongoose";
import { Book } from "../backend/models/bookModel.js"
// const cors = require('cors');
import cors from "cors";
import { ObjectId } from "mongodb";


const PORT = process.env.port || 5000;

const app = express();

//middleware
app.use(express.json());
// app.use(cors());

app.use(
  cors({
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.get('/', (req, res) => {
  // console.log(req);
  return res.status(234).send("Welcome to the Backend of Book store")
});


const mongoDBURL = "mongodb+srv://book-store:XB4jnFnWQrpO1gbe@cluster0.hidmqma.mongodb.net/?retryWrites=true&w=majority";
console.log(mongoDBURL);

//Route for saving a new Book
app.post('/books', async (req, res) => {
  try {
    if (
      !req.body.title || !req.body.author || !req.body.publishYear
    ) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
})

//Route for getting all Books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
})

//route for getting one book from database by id
app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid book ID' })
    }
    //********************** */
    //here was a fckn error which caused me much trouble. don't use {} inside findById.......*************************************
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
})


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








