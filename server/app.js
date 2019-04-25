const express = require('express');             //loads express module (more like function)
const graphqlHTTP = require('express-graphql'); //loads graphqlHTTP function
const schema = require('./schema/schema');      //loads schema.js
const mongoose = require('mongoose');           //loads mongoose

//creates express server
const app = express();  

// CONNECTION CODE START
//NOTE: either use only mongoDB or use only mongoose to connect with atlas mongoDB, don't use both
//using mongoose to connect with atlas mongoDB

const connectionString= "mongodb+srv://tashi:tashi@graphql-tashi-2ssyn.mongodb.net/test?retryWrites=true";

mongoose.connect(connectionString, { useNewUrlParser: true });
mongoose.connection.once('open', () =>{
    console.log('connected to database');
})

// CONNECTION CODE END

//setting up GraphQL endpoint (URL) / middleware
app.use('/graphql', graphqlHTTP({               
    schema,          //ES6 notation for { schema:schema } i.e. {a:a}
    graphiql:true    
}));

app.listen(4000, () => {                        //assigns port 4000 to server
    console.log("now listening for requests on port 4000");
});