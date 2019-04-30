import React from 'react';
import { getAuthorsQuery, addBookMutation } from '../queries/queries';
import { graphql, compose } from 'react-apollo';

class AddBook extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name:"",
            genre:"",
            authorId:""
        };
       
    }

    displayAuthors(){
        let authorData = this.props.getAuthorsQuery;
     
        if(authorData.loading)
            return (<option disabled> Loading... </option>);
        else{
            return authorData.authors.map( author => 
                (<option key={author.id} value={author.id}> {author.name} </option>)
            );             
        }   
    }

    //onSubmit              //no need to bind `this` in arrowfunction, since (`this`) meaning don't change within it.
    submitForm = (e) => {
        e.preventDefault();         //prevents refreshing page when button is clicked
        let data = this.props.addBookMutation;
        //console.log(this.state);
    }

    render(){
        console.log(this.props);         //checking if data is fetched
        return (
            <form onSubmit={this.submitForm}>
                <h3>Add Books</h3>
                <div className="field">
                    Book Name:
                    <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) } />
                </div>

                <div className="field">
                    Genre:
                    <input type="text" onChange={ (e) => this.setState({ genre: e.target.value} ) }/>
                </div>

                <div className="field">
                    Author:
                    <select onChange={ (e) => this.setState({ authorId: e.target.value }) }>
                        <option> select author </option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <div>
                    <button>+</button>
                </div>
            </form>

        );
    }
}

//binding Graphql query with React component
export default compose(
    graphql( getAuthorsQuery, {name: "getAuthorsQuery"} ),
    graphql( addBookMutation, {name: "addBookMutation"} )
)(AddBook);       