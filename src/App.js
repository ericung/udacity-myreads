import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBar from './SearchBar'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  CloseSearch = () => {
    this.setState({ showSearchPage: false });
  };

  OpenSearch = () => {
    this.setState({ showSearchPage: true });
  };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBar closeSearch={this.CloseSearch}/>
        ) : (
          <ListBooks openSearch={this.OpenSearch}/>
        )}
      </div>
    )
  };
}

export default BooksApp