const mongoose = require('mongoose');
const { Schema } = mongoose;

//create Schema
const AuthorSchema = new Schema({
    name:String,
    age:Number
});

//create model
const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;

