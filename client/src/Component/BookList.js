import React, {Component} from 'react';                 //destructuring, i.e. Component = React.Component
import { getBooksQuery } from '../queries/queries';     //import queries
import { graphql } from 'react-apollo';

//component
import BookDetails from './BookDetails';

class BookList extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedBookId:null
        }
    }
    
    displayBook() {
        let data = this.props.data;
        if(data.loading)                     //loading: true
            return "Loading...";
        else{
            return data.books.map( book => 
                (<li onClick={ (e) => { this.setState({ selectedBookId: book.id }) } } key={book.id}> {book.name} </li>) 
            );       //returning JSX element
        }
    }

    render(){
        //console.log(this.props.data);          //checking if query fetches data from db
        return (
            <div>
                <ul id="book-list">
                    { this.displayBook() }
                </ul>
                <BookDetails bookId={ this.state.selectedBookId } />
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);        //binding graphql query with react (component)
