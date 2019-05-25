import React, { useState, useEffect } from 'react';

const AutoComplete = props => {
  const [activeSuggestion, setActiveSuggestion] = useState(69);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');

  const onClick = () => console.log('clicked!');

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
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
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
      <input type="text" value={userInput} onChange={onInputChange} />
      <div>{renderSuggestionListComponent()}</div>
      <br />
    </>
  );
};

export default AutoComplete;
