import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

const Book = (props) => {
    const authorLength = props.itemDetail.authors.length;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: props.itemDetail.bgImage }}></div>
          <BookShelfChanger item={props.itemDetail} updateBooks={props.updateBooks} />
        </div>
        <div className="book-title">{props.itemDetail.title}</div>
        <div className="book-authors">
          {props.itemDetail.authors.map(function(element, index){
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
};

Book.propTypes = {
  itemDetail: PropTypes.object.isRequired,
  updateBooks: PropTypes.func.isRequired
};

export default Book;