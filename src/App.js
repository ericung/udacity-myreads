import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBar from './SearchBar'
import ListBooks from './ListBooks'

class BooksApp extends Component {
  state = {
    books: [],
    bookHash: {}
  };

  componentDidMount() {
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
    return (
      <div className="app">
        <Route exact path='/' render={() => <ListBooks books={this.state.books} />} />
        <Route exact path='/search' render={() => <SearchBar booksInShelf={this.state.bookHash} />} />
      </div>
    )
  };
};

export default BooksApp;
