const express = require('express');             //loads express module (more like function)
const graphqlHTTP = require('express-graphql'); //loads graphqlHTTP function
const schema = require('./schema/schema');      //loads schema.js

//creates express server
const app = express();  

// CONNECTION CODE START
//connect to atlas database

const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://tashi:tashi@graphql-tashi-2ssyn.mongodb.net/test?retryWrites=true"
MongoClient.connect(uri, { useNewUrlParser:true }, function(err, client) {
   
    if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }

   console.log('Connected...');
   
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});
// CONNECTION CODE END



//setting up GraphQL endpoint (URL) / middleware
app.use('/graphql', graphqlHTTP({               
    schema,          //ES6 notation for { schema:schema } i.e. {a:a}
    graphiql:true    
}));

app.listen(4000, () => {                        //assigns port 4000 to server
    console.log("now listening for requests on port 4000");
});