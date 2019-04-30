import React, {Component} from 'react';                 //destructuring, i.e. Component = React.Component
import { getBooksQuery } from '../queries/queries';     //import queries
import { graphql } from 'react-apollo';

class BookList extends Component{
    
    displayBook() {
        let data = this.props.data;
        if(data.loading)                     //loading: true
            return "Loading...";
        else
            return data.books.map( book => (<li key={book.id}> {book.name} </li>) );       //returning JSX element

    }

    render(){
        //console.log(this.props.data);          //checking if query fetches data from db
        return (
            <div>
                <ul id="book-list">
                    {this.displayBook()}
                </ul>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);        //binding graphql query with react (component)
