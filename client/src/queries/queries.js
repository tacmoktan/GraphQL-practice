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
/* using query variables */
const addBookMutation = gql`
    mutation($name:String!, $genre:String!, $authorId:ID!){             
        addBook( name:$name, genre:$genre, authorId:$authorId ){
            name
            id
        }
    }
`
export { getBooksQuery, getAuthorsQuery, addBookMutation }