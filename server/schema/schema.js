const graphql = require('graphql');     //loads graphql
const _ = require('lodash');            //loads lodash library

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;  
//destructuring
//which is similar to  var GraphQLObjectType = graphql.GraphQLObjectType ;

const Book = require('../models/book');             //to interact with book in db
const Author = require('../models/author');         //to interact with author in db

//Dummy Data //dummy data is used without database, they are accessed with lodash functions
/* let books = [
    {name:'John Wick', genre:'action', id:'1',authorId:'3'},
    {name:'Shazam', genre:'DCEU', id:'2',authorId:'1'},
    {name:'Infinity War', genre:'MCU', id:'3',authorId:'2'},
    {name:'Deadpool 2', genre:'MCU', id:'4', authorId:'3'},
    {name:'Age of Ultron', genre:'MCU', id:'5', authorId:'2'},
    {name:'CA: Civil War', genre:'MCU', id:'6', authorId:'2'}
];

let authors = [
    {name:'Billy Batson', age:40, id:'1'},
    {name:'Russo Brothers', age:60, id:'2'},
    {name:'David Leitch', age:50, id:'3'}
]; */

//defining BookType and AuthorType
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({                                   //If field was object like that in RootQueries, instead of function 
        id: { type: GraphQLID },                       //then it would not be possible to define 'author' field with
        name: { type: GraphQLString },                 //'type:AuthorType' since AuthorType is defined after BookType
        genre: { type: GraphQLString },                
        author: {
            type: AuthorType,                    //'resolve functions' respond to queries   
            resolve(parent, args) {              //parent of Author = Book
                //return _.find(authors, { id: parent.authorId });     //finds first author with matching authorId with
                return Author.findById(parent.authorId);               //its respective book
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type : GraphQLString },
        age: {type: GraphQLInt},
        books:{                                 //since an Author writes many books we use GraphQLList
            type: new GraphQLList(BookType),    //denotes list of BookTypes
            resolve(parent, args){
                //return _.filter(books, { authorId: parent.id });      //filter books written by a specific author
                return Book.find({authorId: parent.id} )                //using authorId
            }
        }
    })
});

//defining RootQueries
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {             //for single book
            type: BookType,
            args: { id: {type : GraphQLID } },
            resolve( parent, args){
                //code to get data from db/other source
                //return _.find( books, {id: args.id});           //returns a book using id. 
                                                                //use query 'book(id:1)' in GraphiQL
                return Book.findById(args.id);
            }                                                   

        },

        author: {           //for single author
            type: AuthorType,
            args: { id: {type : GraphQLID} },
            resolve(parent, args) {
                //return _.find(authors, {id: args.id});           //returns author using id
                return Author.findById(args.id);
            }
        },

        books: {            //for list of books
            type: new GraphQLList(BookType),                        //list of BookTypes
            resolve(parent, args){
                //return books;                                     //returns list of books
                return Book.find({});
            }
        },

        authors: {          //for list of authors
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                //return authors;                                   //returns list of authors
                return Author.find({});
            }
        }
    }
});

//Mutation (Adding data to db)
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{

        addAuthor: {
            type:AuthorType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString) },          //not null 
                age: { type: new GraphQLNonNull(GraphQLInt)}
            },

            resolve( parent, args ){
                let author = new Author({                   //creating new instance of Author model
                    name: args.name,
                    age: args.age
                });

                return author.save();           //saves author to db
            }

        },

        addBook: {
            type:BookType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: {type: new GraphQLNonNull(GraphQLID) }
            },

            resolve( parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });

                return book.save();             //saves book to db, .save() is a method in mongoose.
            }
        }

    }
});


//exporting RootQuery schema
module.exports = new GraphQLSchema({                //following properties are displayed in graphiql as RootTypes
    query: RootQuery,                       //enables user to send query using RootQuery declared above
    mutation: Mutation                      //enables user to mutate( CRUD ) data using Mutation declared above
});