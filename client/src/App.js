import React from 'react';

//components
import BookList from './Component/BookList.js';

//pure function react component
function App() {
  return (
    <div id="main">
        <h1> Reading List </h1>
        <BookList />
    </div>
  );
}

export default App;
