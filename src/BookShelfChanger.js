import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {
  moveBookToShelf(moveBook, book, event) {
    moveBook(book, event.target.value);
  };
  
  render() {
    const shelfStatus = (this.props.item.shelf !== undefined) ? this.props.item.shelf : "none";
    return (
      <div className="book-shelf-changer">
        <select value={shelfStatus} onChange={event => this.moveBookToShelf(this.props.moveBook, this.props.item, event)}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
      )
  };
};

BookShelfChanger.propTypes = {
  item: PropTypes.object.isRequired,
  moveBook: PropTypes.func.isRequired
};

export default BookShelfChanger;