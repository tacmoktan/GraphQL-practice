const express = require('express');             //loads express module (more like function)
const graphqlHTTP = require('express-graphql'); //loads graphqlHTTP function

const schema = require('./schema/schema');      //loads schema.js

//creates express server
const app = express();  

//setting up GraphQL endpoint (URL) / middleware
app.use('/graphql', graphqlHTTP({               
    schema,          //ES6 notation for { schema:schema } i.e. {a:a}
    graphiql:true    
}));

app.listen(4000, () => {                        //assigns port 4000 to server
    console.log("now listening for requests on port 4000");
});