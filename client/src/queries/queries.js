import { gql } from 'apollo-boost';

//for BookList Component
const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`

//for AddBook component

const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`

const addBookMutation = gql`
    mutation{
        addBook( name:"" genre:"" authorId:"" ){
            name
            genre
            id
        }
    }
`
export { getBooksQuery, getAuthorsQuery, addBookMutation }