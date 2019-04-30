import React from 'react';
import ApolloClient from 'apollo-boost';
import  { ApolloProvider } from 'react-apollo';

//components
import BookList from './Component/BookList.js';
import AddBook from './Component/AddBook';

//create client
const client = new ApolloClient({
    uri:"http://localhost:4000/graphql"     //endpoint of server from which client requests and retrieves data
});

//pure function react component
function App() {
  return (
    
    <ApolloProvider client= {client} >       {/* connects Apollo Client to React i.e. Within ApolloProvider, allows  */}
      <div id="main">                        {/* using data fetched from endpoint above.   */}
          <h1> Reading List </h1>
          <BookList />
          <AddBook />
      </div>
    </ApolloProvider>

  );
}

export default App;
