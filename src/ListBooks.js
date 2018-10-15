import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  state = {
    wantToReadBooks: [],
    currentlyReadingBooks: [],
    readBooks: []
  };

  moveBookToShelf(book, shelf) {
    //BooksAPI.update(book.id, shelf);
    this.setState((prevState) => ({
      wantToReadBooks: prevState.filter((entry) => entry.id !== book.id).push((shelf === 'wantToRead') ? book : null),
      currentReadingBooks: prevState.filter((entry) => entry.id !== book.id).push((shelf === 'currentlyReading') ? book : null),
      readBooks: prevState.filter((entry) => entry.id !== book.id).push((shelf === 'read') ? book : null)
    }));
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
              <a onClick={this.props.openSearch}>Add a book</a>
            </div>
          </div>
    )
  };
}

export default ListBooks