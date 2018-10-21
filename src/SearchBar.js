import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class SearchBar extends Component {
  state = {
    books: [],
    bookInShelf: {}
  };

  moveBookToShelf = (book, shelf) => {    
    let self = this;
    
    BooksAPI.update(book, shelf);
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