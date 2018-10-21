import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BookShelf = (props) => {
    const moveBook = props.moveBook;
    return (
      <div className="bookshelf-books">
      <ol className="books-grid">
      {
        props.bookCollection.map(function(element) {
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
};

BookShelf.propTypes = {
  bookCollection: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired
};

export default BookShelf;