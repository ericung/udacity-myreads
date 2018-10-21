import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
  render() {
    const moveBook = this.props.moveBook;
    const bookCollection = (this.props.bookCollection !== undefined) ? this.props.bookCollection : [];
    return (
      <div className="bookshelf-books">
      <ol className="books-grid">
      {
        bookCollection.map(function(element) {
          return(
            <li key={element.id}>
              <Book itemDetail={element} moveBook={moveBook} />
            </li>
          )
        })
      }
      </ol>
    </div>
    )
  }
}

export default BookShelf