import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import SearchBar from './SearchBar'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path='/search' component={SearchBar} />
          <Route exact path='/' component={ListBooks} />
        </div>
      </BrowserRouter>
    )
  };
};

export default BooksApp;
