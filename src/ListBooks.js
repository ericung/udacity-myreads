import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  state = {
    wantToReadBooks: [],
    currentlyReadingBooks: [],
    readBooks: []
  };

  moveBookToShelf = (book, shelf) => {
    var updatedWantToReadBooks = this.state.wantToReadBooks.filter((entry) => entry.id !== book.id);
    var updatedCurrentlyReadingBooks = this.state.currentlyReadingBooks.filter((entry) => entry.id !== book.id);
    var updatedReadBooks = this.state.readBooks.filter((entry) => entry.id !== book.id);
    var updatedBook = book;
    
    updatedBook.shelf = shelf;
    
    switch(shelf) {
      case 'wantToRead':
        updatedWantToReadBooks.push(updatedBook);
        break;
      case 'currentlyReading':
        updatedCurrentlyReadingBooks.push(updatedBook);
        break;
      case 'read':
        updatedReadBooks.push(updatedBook);
        break;
      default:
        break;
    }
    
    this.setState((prevState) => ({
      wantToReadBooks: updatedWantToReadBooks,
      currentlyReadingBooks: updatedCurrentlyReadingBooks,
      readBooks: updatedReadBooks
    }));
    
    BooksAPI.update(book, shelf);
  };

  componentDidMount(){
    let self = this;
    BooksAPI.getAll().then(function(results){
      self.setState(() => ({
        wantToReadBooks: results.filter(entry => entry.shelf === 'wantToRead'),
        currentlyReadingBooks: results.filter(entry => entry.shelf === 'currentlyReading'),
        readBooks: results.filter(entry => entry.shelf === 'read')
      }));
    });
  };

  render() {
    return(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <BookShelf bookCollection={this.state.currentlyReadingBooks} moveBook={this.moveBookToShelf} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookShelf bookCollection={this.state.wantToReadBooks} moveBook={this.moveBookToShelf} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookShelf bookCollection={this.state.readBooks} moveBook={this.moveBookToShelf} />
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
    )
  };
};

export default ListBooks;