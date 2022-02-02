const { gql } = require('apollo-server-express');


const typeDefs = gql`


type Query {
    me: User
} 

type Mutation {
    login(email: String!, email: String!): Auth
    addUser(username:String!, email:String!, password:String!): Auth
    saveBook(input: SavedBookInput): User
    removeBook(bookId: String): User
}


input SavedBookInput {
    author: [String]
    description: String
    bookId: String
    image: String 
    link: String
    title: String
}

type User {
    _id: ID
 username: String!
 email: String!
 bookCount: Int
 savedBooks: [Book]
}

type Book {
    bookId: String! 
    authors: [String]
    description: String! 
    title: String! 
    image: String 
    link: String 
}

type Auth { 
    token: ID! 
    user: User
}

`;

module.exports = typeDefs;



//mutation types  are linked to relationships with resolvers. 
//i.e login requires email password, logging in awaits the User, therefore check 
//user Model to type, i.e. email is a String, passworking is a string 
//they are also both required, which means we use an ! 
//and requires Auth to login 

//mutation type for saveBook and remove book 
//save book accepts BookAuthor array, description, title, bookId, image and link as params
//thats why in resolvers we use {input} for 2nd param as it accepts the entite input
//resolvers line 37, {input}
//resolvers line 43, {addToSet: {savedBooks: input}} = adding the entire input to updated USeer. 
