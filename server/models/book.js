const mongoose = require('mongoose');   //loads mongoose
const { Schema } = mongoose;    //destructuring,  Schema =  mongoose.Schema

//creating Schema
const BookSchema = new Schema({
    name:String,
    genre:String,
    authorId:String                 //authorId must be a String not a number
});                                 //because when adding an instance of collection/model to atlas:mongodb (addAuthor),    
                                    //id is automatically assigned to it as string within ObjectId.
                                    // e.g. `_id:ObjectId("512drffghg333")`
//creating model
const Book = mongoose.model('book', BookSchema);

module.exports = Book;