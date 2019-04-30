import { gql } from 'apollo-boost';

//BookList Query
const getBooksQuery = gql`
    {
        books{
            name
            genre
            id
        }
    }
`

export { getBooksQuery }