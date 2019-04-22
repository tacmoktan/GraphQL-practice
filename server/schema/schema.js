const graphql = require('graphql');     //loads graphql
const _ = require('lodash');            //loads lodash library

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;  //destructuring
//which is similar to  var GraphQLObjectType = graphql.GraphQLObjectType ;

//Dummy Data
let books = [
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
];

//defining BookType and AuthorType
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({                                   //If field was object like that in RootQueries, instead of function 
        id: { type: GraphQLID },                       //then it would not be possible to define 'author' field with
        name: { type: GraphQLString },                 //'type:AuthorType' since AuthorType is defined after BookType
        genre: { type: GraphQLString },                
        author: {
            type: AuthorType,                    //'resolve functions' responds to queries   
            resolve(parent, args) {              //parent of Author = Book
                return _.find(authors, { id: parent.authorId });     //find authors of respective books using authorId
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () => ({
        name: {type : GraphQLString },
        age: {type: GraphQLInt},
        id: {type: GraphQLID},
        books:{                                 //since an Author writes many books we use GraphQLList
            type: new GraphQLList(BookType),    //denotes list of BookTypes
            resolve(parent, args){
                return _.filter(books, { authorId: parent.id });    //filter books written by a specific author
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
                return _.find( books, {id: args.id});           //returns a book using id. 
            }                                                   //use query 'book(id:1)' in GraphiQL 
        },

        author: {           //for single author
            type: AuthorType,
            args: { id: {type : GraphQLID} },
            resolve(parent, args) {
                return _.find(authors, {id: args.id});
            }
        },

        books: {            //for list of books
            type: new GraphQLList(BookType),    //list of BookTypes
            resolve(parent, args){
                return books;                   //returns list of books
            }
        },

        authors: {          //for list of authors
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors;                 //returns list of authors
            }
        }
    }
});


//exporting RootQuery schema
module.exports = new GraphQLSchema({
    query: RootQuery
});