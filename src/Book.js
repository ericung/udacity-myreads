import React, { Component } from 'react'
import BookShelfChanger from './BookShelfChanger'


class Book extends Component {
  render() {
    const authorLength = this.props.itemDetail.authors.length;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + this.props.itemDetail.imageLinks.thumbnail +')' }}></div>
            <BookShelfChanger item={this.props.itemDetail} moveBook={this.props.moveBook} />
          </div>
        <div className="book-title">{this.props.itemDetail.title}</div>
        <div className="book-authors">
          {this.props.itemDetail.authors.map(function(element, index){
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