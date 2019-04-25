const mongoose = require('mongoose');   //loads mongoose
const { Schema } = mongoose;    //destructuring,  Schema =  mongoose.Schema

//creating Schema
const BookSchema = new Schema({
    name:String,
    genre:String,
    authorId:Number
});

//creating model
const Book = mongoose.model('Book', BookSchema);

module.exports = Book;