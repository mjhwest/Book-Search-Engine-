// App.js: Create an Apollo Provider to make every request work with the Apollo Server.
import React from 'react';
//DO NOT THINK WE NEED 'switch' in react-router-dom 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//this below import was added 
import {
  ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  url: '/graphql',
  cache: new InMemoryCache(), 
})


function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
