'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
app.use(cors());
mongoose.connect(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3002;
const Book = require('./Books')
app.get('/test', (request, response) => {
  
  response.send('test request received')
  
})
app.get('/books',getBooks) 
async function getBooks(request,response){
  try {
    let bookResponse = await Book.find({})
    response.send(bookResponse);
    
  } catch (error) {
    console.log(error.message)
    response.send('no books found!').status(400)
  }
}
let addBook = new Book({
  name:'',
  description:'',
  status: true,
})
addBook.save


app.listen(PORT, () => console.log(`listening on ${PORT}`));

