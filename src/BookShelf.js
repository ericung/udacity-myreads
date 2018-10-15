import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
  render() {
    const moveBook = this.props.moveBook;
    return (
      <div className="bookshelf-books">
      <ol className="books-grid">
      {
        this.props.bookCollection.map(function(element) {
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