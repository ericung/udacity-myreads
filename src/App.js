import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBar from './SearchBar'
import ListBooks from './ListBooks'

class BooksApp extends Component {
  constructor(props){
    super(props);
    let self = this;
    BooksAPI.getAll().then(function(results){
      var bookHash = {};
      results.forEach(function(element) {
        bookHash[element.id] = { shelf: element.shelf };
      });
      self.setState(() => ({
        books: results,
        bookHash: bookHash
      }));
    });
  };
  state = {
    books: [],
    bookHash: {}
  };

  componentWillMount() {
    let self = this;
    BooksAPI.getAll().then(function(results){
      var bookHash = {};
      results.forEach(function(element) {
        bookHash[element.id] = { shelf: element.shelf };
      });
      self.setState(() => ({
        books: results,
        bookHash: bookHash
      }));
    });
  };

  render() {
    const books = this.state.books;
    const bookHash = this.state.bookHash;
    return (
      <div className="app">
        <Route exact path='/' component={(props) => <ListBooks books={books} {...props} />} />
        <Route exact path='/search' component={(props) => <SearchBar booksInShelf={bookHash} {...props} />} />
      </div>
    )
  };
};

export default BooksApp;
