const express = require('express');
const path = require('path');
//establish DB connection
const db = require('./config/connection');
// import the Apollo Server 
const {ApolloServer} = require('apollo-server-express');
//import typeDefs and resolvers from schema 
const {resolvers, typeDefs} = require('./schemas')
//import 'authMiddleWare()' function to be configured with the Apollo Server 
const {authMiddleware} = require('./utils/auth');

//express server
const app = express();
const PORT = process.env.PORT || 3001;

// this may not be needed ref topic 25 server.js
// const routes = require('./routes');

// apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  //add context to our server so data from middleware() function can pass data to our resolver functions
  context: authMiddleware,
})

//apply Apollo Server with express app 
server.applyMiddleware({ app })



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// THIS MAY NOT BE NEEDED Ref; topic 25 server.js
// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on http://localhost:${PORT}`)
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});
});
