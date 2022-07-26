const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book