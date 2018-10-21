import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class SearchBar extends Component {
  // Two variables to keep track of: books being searched and dictionary of books.
  state = {
    books: [],
    bookInShelf: {}
  };

  // Two calls to the bookAPI; the first is the update then the second is getAll second to update state.
  moveBookToShelf = (book, shelf) => {    
    let self = this;
    var bookList = this.state.books;
    
    bookList.forEach(function(element) {
      if (element.id === book.id) {
        element.shelf = shelf;
      }
    });
    
    BooksAPI.update(book, shelf);
    BooksAPI.getAll().then(function(results){
      var bookHash = {};
      results.forEach(function(element) {
        bookHash[element.id] = element;
      });
      self.setState(() => ({
        books: bookList,
        booksInShelf: bookHash
      }));
    });
  };

  getSearchResult = inputText => {
    let self = this;
    if (inputText !== "") {
      BooksAPI.search(inputText).then(function(results) {
        if (results.error !== undefined) {
          self.setState({
            books: []
          });
        } else {
          var bookList = [];
          results.forEach(function(element){
            if(self.state.booksInShelf[element.id] !== undefined) {
              element.shelf = self.state.booksInShelf[element.id].shelf;
            }
            bookList.push(element);
          });
          self.setState({
            books: bookList
          });
        } 
      });
    } else {
      this.setState({
        books: []
      });
    }
  };

  componentDidMount() {
    let self = this;
    BooksAPI.getAll().then(function(results){
      var bookHash = {};
      results.forEach(function(element) {
        bookHash[element.id] = element;
      });
      self.setState(() => ({
        booksInShelf: bookHash
      }));
    });
  };

  render() {
    return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={event => this.getSearchResult(event.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <BookShelf bookCollection={this.state.books} moveBook={this.moveBookToShelf}/>
            </div>
          </div>
      )
  };
};

export default SearchBar;