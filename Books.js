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
    enum: ["Lucy's favorite book", "Trevor's favorite book"],
  },
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book