'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3002;
const Book = require('./Books')
app.get('/test', (request, response) => {

  response.send('test request received')

})
app.get('/books', getBooks)
app.post('/books', postBooks)
// app.delete('/books',deleteBooks)
async function getBooks(request, response) {
  try {
    let bookResponse = await Book.find({})
    response.send(bookResponse);

  } catch (error) {
    console.log(error.message)
    response.send('no books found!').status(400)
  }
}
async function postBooks(request, response) {
  console.log(request)
  try {
    const book = await Book.create(request.body)
    response.status(201).send(book)

  } catch (error) {
    console.log(error.message)
    response.send('no book was created').status(400)
  }
}
app.delete('/books/:id', async (request, response) => {
  let id = request.params.id;
  try {
    await Book.findByIdAndDelete(id);
    response.status(204).send('the selected book was deleted');
  } catch (error) {
    console.error(error);
    response.status(404).send(`Unable to delete book with id ${id}`)
  }
});

app.put('/books/:id', async (request, response) => {
  try {
    
    const { title, description, status } = request.body;
    const updatedBook = await Book.findByIdAndUpdate(request.params.id, { title, description, status }, { new: true, overwrite: true });
    response.send(updatedBook);
  } catch (error) {
    console.error(error);
    response.status(404).send(`Unable to update book with id ${id}`
)}  
});
// async function deleteBooks(request, response){
//   try {
//     const remove = await Book.delete(request.body)
//     response.status(201).
//   } catch () {

//   }
// }
let addBook = new Book({
  name: '',
  description: '',
  status: true,
})
addBook.save


app.listen(PORT, () => console.log(`listening on ${PORT}`));

