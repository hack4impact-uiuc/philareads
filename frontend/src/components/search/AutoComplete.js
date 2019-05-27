import React, { useState, useEffect } from 'react';
import history from '../../history';
import { Link } from 'react-router-dom';
import '../../styles/components/AutoComplete.scss';

const AutoComplete = props => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [userInput, setUserInput] = useState('');

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      setActiveSuggestion(0);
      setUserInput(filteredSuggestions[activeSuggestion]);
      history.push(`/search?query=${filteredSuggestions[activeSuggestion]}`);
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) return;
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) {
      if (activeSuggestion === filteredSuggestions.length - 1) return;
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const onInputChange = e => {
    setUserInput(e.currentTarget.value);
  };

  useEffect(
    () => {
      if (userInput) {
        setFilteredSuggestions(
          props.suggestions.filter(
            suggestion =>
              suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
          )
        );
      }
      if (userInput === '') setFilteredSuggestions([]);
    },
    [userInput]
  );

  const renderSuggestionListComponent = () =>
    filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, i) => {
          let className;

          if (i === activeSuggestion) {
            className = 'suggestion-active';
          }
          return (
            <li className={className} key={suggestion}>
              <Link className="link" to={`/search?query=${suggestion}`}>
                {suggestion}
              </Link>
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions">
        {userInput && <em>No suggestions, sorry :(</em>}
      </div>
    );

  return (
    <>
      <input
        placeholder="Search for a book..."
        type="text"
        value={userInput}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
      />
      <div>{renderSuggestionListComponent()}</div>
      <br />
    </>
  );
};

export default AutoComplete;
