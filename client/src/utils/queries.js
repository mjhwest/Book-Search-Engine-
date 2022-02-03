
// queries.js: This will hold the query GET_ME, which will execute the me query set up using Apollo Server.
//import qgl from Apollo Client
import { gql } from '@apollo/client';


//ref topic26 client/src/utils/queries
export const GET_ME = gql`
query me {
    _id
    username
    email 
    bookCount 
    savedBooks {
        authors 
        description
        bookId 
        image 
        link 
        title 
    }
}
`;


//me is User 
// __id
// username 
// email 
// bookCount 
// // savedBooks - savedBooks = [Book] =
// i.e. a user can have multiple books {
//     authors 
//     description 
//     bookId 
//     image
//     link
//     title 


// }