import React, { Component } from 'react';

const results = ['Water lillies', 'Swamps', 'Frog lifespan'];

class Search extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      selectedResult: -1,
      resultsOpen: false
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }

  handleOptionClick(result) {
    this.setState({
      value: result,
      resultsOpen: false,
      selectedResult: -1
    });
  }

  handleBlur() {
    // Close after slight delay to allow clicks on options
    setTimeout(() => {
      this.setState({
        selectedResult: -1,
        resultsOpen: false
      });
    }, 100);
  }

  handleChange(ev) {
    const value = ev.target.value;
    const stateChange = { value };

    if (value === '') {
      stateChange.selectedResult = -1;
    } else {
      stateChange.resultsOpen = true;
    }

    this.setState(stateChange);
  }

  handleKeyDown(ev) {
    const { selectedResult } = this.state;
    const key = ev.key;
    const lastIndex = results.length - 1;

    if (key === 'ArrowDown') {
      this.setState({
        resultsOpen: true,
        selectedResult: selectedResult >= lastIndex ? 0 : selectedResult + 1
      });
      return;
    }

    if (key === 'ArrowUp') {
      this.setState({
        resultsOpen: true,
        selectedResult: selectedResult <= 0 ? lastIndex : selectedResult - 1
      });
      return;
    }

    if (key === 'Enter') {
      this.setState({
        resultsOpen: false,
        selectedResult: -1,
        value: results[selectedResult]
      });
      return;
    }

    if (key === 'Escape') {
      this.setState({
        resultsOpen: false,
        selectedResult: -1
      });
      return;
    }
  }

  render() {
    const { value, selectedResult, resultsOpen } = this.state;
    const { formLabels } = this.props;
    const searchControls = 'pt2 pb2 pr3 pl3 f6 br-pill';

    return (
      <form role="search" onSubmit={ev => ev.preventDefault()}>
        {formLabels ? (
          <label id="search-label" className="a11yText">
            Search
          </label>
        ) : null}

        <div
          role="combobox"
          aria-expanded={resultsOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
          className="dib relative"
        >
          <input
            aria-labelledby="search-label"
            aria-autocomplete="list"
            autoComplete="off"
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            placeholder="Current frog events..."
            className={`${searchControls} searchInput`}
            value={value}
            type="search"
            role="textbox"
          />

          <ul
            aria-labelledby="search-label"
            role="listbox"
            id="search-listbox"
            className={`absolute left-0 right-0 z-1 bg-white black f6 shadow-1 br2 mt2 pt2 pb2 searchResults ${
              !resultsOpen ? 'dn' : ''
            }`}
          >
            {results &&
              results.map((result, i) => (
                <li
                  aria-selected={i === selectedResult ? 'true' : 'false'}
                  role="option"
                  key={i}
                  className={`pr3 pl3 pt2 pb2 hover-bg-light-green pointer ${
                    i === selectedResult ? 'bg-light-green' : ''
                  }`}
                  onClick={() => this.handleOptionClick(result)}
                >
                  {result}
                </li>
              ))}
          </ul>
        </div>

        <button
          className={`${searchControls} b ml2 bg-black-40 white bg-animate hover-bg-black-60`}
          type="submit"
        >
          Search
        </button>
      </form>
    );
  }
}

export default Search;
