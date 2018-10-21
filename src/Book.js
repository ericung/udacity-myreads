import React, { Component } from 'react'
import BookShelfChanger from './BookShelfChanger'


class Book extends Component {
  render() {
    const authorLength = (this.props.itemDetail.authors !== undefined) ? this.props.itemDetail.authors.length : 0;
    const authors = (this.props.itemDetail.authors !== undefined) ? this.props.itemDetail.authors : [];
    const bgImage = (this.props.itemDetail.imageLinks.thumbnail !== undefined) ? 'url(' + this.props.itemDetail.imageLinks.thumbnail +')' : '';
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: bgImage }}></div>
          <BookShelfChanger item={this.props.itemDetail} moveBook={this.props.moveBook} />
        </div>
        <div className="book-title">{this.props.itemDetail.title}</div>
        <div className="book-authors">
          {authors.map(function(element, index){
            if(authorLength === (index + 1)){
                return element;
              } else {
                return element + ", ";
              }
            })
          }
      </div>
    </div>
    )
  }
}

export default Book