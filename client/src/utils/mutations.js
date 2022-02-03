import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation login($email: String! $password: $String!){
    login(email: $email, password: $password){
        token 
        user {
            _id
            username
        }
    }
}
`;
//ref above topic 26, client, src, utils, mutations.js
//check about mutation Login, readme says loginUser, but mutation is reffered to as Login. 
export const ADD_USER = gql`
mutation addUser($username: String! $email: String! $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
             }
        }
    }
}
`;
//not sure if addUser is correct


export const SAVE_BOOK = gql`
mutation saveBook($input: SavedBookInput) {
    saveBook(input: $input){
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
}
`;


export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String) {
    removeBook(bookId: $bookId) {
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
}
`;

// mutations.js:
//reference topic 26. client src, utils, mutations.js

// LOGIN_USER will execute the loginUser mutation set up using Apollo Server. DONE

// ADD_USER will execute the addUser mutation. DONE 

// SAVE_BOOK will execute the saveBook mutation. DONE 

// REMOVE_BOOK will execute the removeBook mutation. DONE 
