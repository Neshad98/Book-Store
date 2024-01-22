import express from 'express';
const router = express.Router();
//always include .js when importing
import { Book } from '../models/bookModel.js';



//Route for saving a new Book
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    //copied from chatgpt
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

//Route for updating a book 
router.put('/:id', async (req, res) => {
  try {
    if (
      !req.body.title || !req.body.author || !req.body.publishYear
    ) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message })
  }
})

// Route for deleting a book
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id);
    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book deleted successfully" });

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message })
  }
});

export default router;