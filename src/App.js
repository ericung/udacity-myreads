import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBar from './SearchBar'
import ListBooks from './ListBooks'

class BooksApp extends Component {
  state = {
    books: []
  };

  updateBooks = (book, shelf) => {
    var updatedBooks = this.state.books;
    
    updatedBooks.forEach(function(element) {
      if (element.id === book.id) {
        element.shelf = shelf;
      }
    });

    this.setState(() => ({
      books: updatedBooks
    }));

    // Update the book on the database side.
    BooksAPI.update(book, shelf);
  };

  backFromSearch(books) {
    var updatedBookHash = books;
    var updatedBooks = [];
    
    updatedBookHash.forEach(function(element){
      updatedBooks.push(element);
    });

    this.setState(() => ({
      books: updatedBooks
    }));
  };

  componentDidMount() {
    let self = this;
    BooksAPI.getAll().then(function(results){
      var bookList = [];

      results.forEach(function(element) {
        // Do some initial data check.
        var authors = (element.authors !== undefined) ? element.authors : [];
        var bgImage = (element.imageLinks.thumbnail !== undefined) ? 'url(' + element.imageLinks.thumbnail +')' : '';
        
        bookList.push({
          authors: authors,
          bgImage: bgImage,
          id: element.id,
          shelf: element.shelf,
          title: element.title
        });
      });
      
      self.setState(() => ({
        books: bookList
      }));
    });
  };

  render() {
    return (
      <div className="app">
        <Route exact path='/' component={() => <ListBooks books={this.state.books} updateBooks={this.updateBooks} />} />
        <Route exact path='/search' component={() => <SearchBar books={this.state.books} updateBooks={this.updateBooks} backButton={this.backFromSearch} />} />
      </div>
    )
  };
};

export default BooksApp;