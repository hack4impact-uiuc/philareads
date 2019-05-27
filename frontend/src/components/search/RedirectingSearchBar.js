import React, { useEffect, useState } from 'react';
import AutoComplete from '../search/AutoComplete';
import { getAllPublishedBooks } from '../../utils/api';

const RedirectingSearchBar = () => {
  const [bookTitles, setBookTitles] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const response = await getAllPublishedBooks();
      setBookTitles(response.result.results.map(book => book.name));
    }
    fetchBooks();
  }, []);

  return <AutoComplete suggestions={bookTitles} />;
};

export default RedirectingSearchBar;
