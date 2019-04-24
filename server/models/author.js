const mongoose = require('mongoose');
const { Schema } = mongoose;

//create Schema
const AuthorSchema = new Schema({
    name:String,
    age:Number
});

//create model
const Author = mongoose.model('author', AuthorSchema);

module.exports = Author;

