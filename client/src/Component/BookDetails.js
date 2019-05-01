import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBookDetailsQuery } from '../queries/queries';

class BookDetails extends Component {
    displayBookDetails() {
        let { book } = this.props.data;
        if (book) {
            //console.log(book);
            return (
                <div>
                    <h3>Book Details</h3>
                    <p> {book.name} </p>
                    <p> {book.genre} </p>
                    <p> {book.author.name} </p>
                    <p> {book.author.age} </p>
                    <p> Books </p>
                    <ul>
                        {
                            book.author.books.map(book_item => <li key={book_item.id}> {book_item.name} </li>)
                        }
                    </ul>
                </div>
            );
        }
        else {
            return (<h3> Book Not Selected </h3>);
        }


    }

    render() {
        return (
            <div id="book-details">
                {this.displayBookDetails()}
            </div>
        );
    }
}

export default graphql(getBookDetailsQuery, {
    options: (props) => {
        return {
            variables: { id: props.bookId }          //uses this bookId in the query to fetch book details
        }
    }
})(BookDetails);