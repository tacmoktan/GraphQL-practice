import React, {Component} from 'react'; //destructuring, i.e. Component = React.Component

class BookList extends Component{
    render(){
        return (
            <div>
                <ul id="book-list">
                    <li>Book 1</li>
                </ul>
            </div>
        );
    }
}

export default BookList; 
