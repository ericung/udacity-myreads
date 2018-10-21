import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class SearchBar extends Component {
  state = {
    books: []
  };

  moveBookToShelf = (book, shelf) => {    
    BooksAPI.update(book, shelf);
  }

  getSearchResult = inputText => {
    let self = this;
    if (inputText !== "") {
      BooksAPI.search(inputText).then(function(results) {
        if (results.error !== undefined) {
          self.setState({
            books: []
          });
        } else {
          self.setState({
            books: results
          });
        } 
      });
    } else {
      this.setState({
        books: []
      });
    }
  }

  render() {
    return (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={this.props.closeSearch}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={event => this.getSearchResult(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <BookShelf bookCollection={this.state.books} moveBook={this.moveBookToShelf}/>
            </div>
          </div>
      )
  }
}

export default SearchBar