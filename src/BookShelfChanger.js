import React, { Component } from 'react'

class BookShelfChanger extends Component {
  moveBookToShelf(moveBook, book, event) {
    moveBook(book, event.target.value);
  };
  
  render() {
    return (
      <div className="book-shelf-changer">
        <select onChange={event => this.moveBookToShelf(this.props.moveBook, this.props.itemDetail, event)}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
      )
  };
}

export default BookShelfChanger