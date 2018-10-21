import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'


const Book = (props) => {
    const authorLength = (props.itemDetail.authors !== undefined) ? props.itemDetail.authors.length : 0;
    const authors = (props.itemDetail.authors !== undefined) ? props.itemDetail.authors : [];
    // console.log(props.itemDetail.imageLinks + "\tfrom\t" + props.itemDetail);
    const bgImage = (props.itemDetail.imageLinks.thumbnail !== undefined) ? 'url(' + props.itemDetail.imageLinks.thumbnail +')' : '';
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: bgImage }}></div>
          <BookShelfChanger item={props.itemDetail} moveBook={props.moveBook} />
        </div>
        <div className="book-title">{props.itemDetail.title}</div>
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
};

Book.propTypes = {
  itemDetail: PropTypes.object.isRequired,
  moveBook: PropTypes.func.isRequired
};

export default Book;