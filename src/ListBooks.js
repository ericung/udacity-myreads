import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  state = {
    wantToReadBooks: [],
    currentlyReadingBooks: [],
    readBooks: []
  };

  // Updates shelf visually via React and uses API to update it. No need to fetch from database.
  moveBookToShelf = (book, shelf) => {
    var updatedWantToReadBooks = this.state.wantToReadBooks;
    var updatedCurrentlyReadingBooks = this.state.currentlyReadingBooks;
    var updatedReadBooks = this.state.readBooks;
    
    updatedWantToReadBooks.forEach(function(element) {
      if (element.id === book.id) {
        element.shelf = shelf;
      }
    });
    
    updatedCurrentlyReadingBooks.forEach(function(element) {
      if (element.id === book.id) {
        element.shelf = shelf;
      }
    });
    
    updatedReadBooks.forEach(function(element) {
      if (element.id === book.id) {
        element.shelf = shelf;
      }
    });
    
    this.setState((prevState) => ({
      wantToReadBooks: updatedWantToReadBooks,
      currentlyReadingBooks: updatedCurrentlyReadingBooks,
      readBooks: updatedReadBooks
    }));
  };

  componentDidMount() {
    this.setState({
      wantToReadBooks: this.props.books.filter(entry => entry.shelf === 'wantToRead'),
      currentlyReadingBooks: this.props.books.filter(entry => entry.shelf === 'currentlyReading'),
      readBooks: this.props.books.filter(entry => entry.shelf === 'read')
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
                  <BookShelf bookCollection={this.state.currentlyReadingBooks} moveBook={this.moveBookToShelf} updateBooks={this.props.updateBooks} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookShelf bookCollection={this.state.wantToReadBooks} moveBook={this.moveBookToShelf} updateBooks={this.props.updateBooks} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookShelf bookCollection={this.state.readBooks} moveBook={this.moveBookToShelf} updateBooks={this.props.updateBooks} />
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

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  updateBooks: PropTypes.func.isRequired
}

export default ListBooks;