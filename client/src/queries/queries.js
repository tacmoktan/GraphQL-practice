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
// using query variables , '!' refers to not null
const addBookMutation = gql`
    mutation( $name: String!, $genre: String!, $authorId: ID! ){             
        addBook( name: $name, genre: $genre, authorId: $authorId ){
            name
            id
        }
    }
`

//book details query
const getBookDetailsQuery = gql`
    query( $id: ID! ){
        book( id: $id ){
            name
            genre
            id
            author{
                id
                name
                age
                books{
                    id
                    name
                }
            }
        }
    }
`

export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookDetailsQuery }