'use strict'
require('dotenv').config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection
const Book = require('./Books')

db.once('open', _=>{
  console.log("seeding database")
  seedDatabase()
  async function seedDatabase(){
    await Book.create({title:'48 laws of power', description: 'book about power'})
    await Book.create({title:'hunger games', description: 'survival book'})
    await Book.create({title:'harry potter', description: 'wizard book'})
    db.close()
  }
})