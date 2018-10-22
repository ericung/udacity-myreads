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

  // Update the state of the searchbar component and update it via a call to the API.
  moveBookToShelf = (book, shelf) => {    
    let self = this;
    var bookList = this.state.books;
    var bookHash = this.state.bookInShelf;
    
    // Handle the book from the search.
    bookList.forEach(function(element) {
      if (element.id === book.id) {
        element.shelf = shelf;
      }
    });
    
    // Handle the books in collection.
    if(shelf === "none") {
      // Remove book from hash table.
      bookHash[book.id] = undefined;
    } else {
      // Add book to hash table if it doesn't already exist.
      if (bookHash[book.id] === undefined) {
        bookHash[book.id] = book;
      } 
      
      bookHash[book.id].shelf = shelf;
    }
    
    // Update the state of the searchbar.
    self.setState(() => ({
        books: bookList,
        booksInShelf: bookHash
    }));
    
    // Update the book on the database side.
    BooksAPI.update(book, shelf);
  };

  // Function is called every time search bar has text change. 
  getSearchResult = inputText => {
    let self = this;
    
    // Check for empty input.
    if (inputText !== "") {
      // Call API to get results
      BooksAPI.search(inputText).then(function(results) {
        // Check if the text entered returns results. If it doesn't, set state of books to empty array.
        if (results.error !== undefined) {
          self.setState({
            books: []
          });
        } else {
          // If results are returned, iterate and add the property, shelf, from the books in user's shelves to the entries.
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

  // Set up the state of the searchbar.
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