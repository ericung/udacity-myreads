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

  updateBooks = (book, shelf) => {
    var updatedBooks = this.state.books;
    var updatedBookHash = this.state.bookHash;
    
    updatedBooks.forEach(function(element) {
      if (element.id === book.id) {
        element.shelf = shelf;
      }
    });
    
    // Handle the books in collection.
    if(shelf === "none") {
      // Remove book from hash table.
      updatedBookHash[book.id] = undefined;
    } else {
      // Add book to hash table if it doesn't already exist.
      if (updatedBookHash[book.id] === undefined) {
        updatedBookHash[book.id] = book;
      } 
      
      // update book in collection to shelf
      updatedBookHash[book.id].shelf = shelf;
    }

    this.setState(() => ({
      books: updatedBooks,
      bookHash: updatedBookHash
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
      books: updatedBooks,
      bookHash: updatedBookHash
    }));
  };

  componentDidMount() {
    let self = this;
    BooksAPI.getAll().then(function(results){
      var bookList = [];
      var bookHash = {};

      results.forEach(function(element) {
        var authors = (element.authors !== undefined) ? element.authors : [];
        var bgImage = (element.imageLinks.thumbnail !== undefined) ? 'url(' + element.imageLinks.thumbnail +')' : '';
        
        bookList.push({
          authors: authors,
          bgImage: bgImage,
          id: element.id,
          shelf: element.shelf,
          title: element.title
        });
        
        bookHash[element.id] = { authors: authors,
          bgImage: bgImage,
          id: element.id,
          shelf: element.shelf,
          title: element.title
        };
      });
      
      self.setState(() => ({
        books: bookList,
        bookHash: bookHash
      }));
    });
  };

  render() {
    return (
      <div className="app">
        <Route exact path='/' component={(props) => <ListBooks books={this.state.books} updateBooks={this.updateBooks} {...props} />} />
        <Route exact path='/search' component={(props) => <SearchBar booksInShelf={this.state.bookHash} updateBooks={this.updateBooks} backButton={this.backFromSearch} {...props} />} />
      </div>
    )
  };
};

export default BooksApp;