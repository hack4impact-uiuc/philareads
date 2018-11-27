import 'whatwg-fetch';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://localhost:5000' // change this to prod endpoint
    : 'http://localhost:5000';

function register(formData) {
  return fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then(res => res.json());
}

function login(formData) {
  return fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then(res => res.json());
}

function search(searchString) {
  const query = `search_string=${searchString}`;
  return fetch(`${API_URL}/books?${query}`, {
    method: 'GET'
  }).then(res => res.json());
}

function getBooksByYearGrade({ year, grade }) {
  if (year === undefined && grade === undefined) {
    console.log(
      'getBooksByYearGrade did not receive a year or grade. You should use getBooks instead'
    );
  }
  let query = '';
  if (year !== undefined) {
    query += `year=${year ? year : ''}&`;
  }
  if (grade !== undefined) {
    query += `grade=${grade ? grade : ''}`;
  }
  return fetch(`${API_URL}/books?${query}`, {
    method: 'GET'
  }).then(res => res.json());
}

function getROArchiveYears({ grade }) {
  return fetch(`${API_URL}/years`, {
    method: 'GET'
  }).then(res => res.json());
}

function getBookData(id) {
  console.log('Getting book data');
  return fetch(`${API_URL}/books?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
}

function getQuizzes(bookID) {
  console.log('Getting quiz data');
  return fetch(`${API_URL}/${bookID}/quizzes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
}

function postQuizResults(quizResultsData) {
  return fetch(`${API_URL}/quiz_result`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(userData)
  }).then(res => res.json());
}

function getUserData() {
  console.log('Getting user data');

  return fetch(`${API_URL}/user`, {
  // console.log('Getting user data');
  // return fetch(`${API_URL}/user`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   credentials: 'include',
  //   body: JSON.stringify(quizResultsData)
  // }).then(res => res.json());

  const dict = {
    name: 'David Chang',
    email: 'davidchang@chegg.com'
  };
  return dict;
function createBook(bookData) {
  console.log('Creating/posting new book');
  return fetch(`${API_URL}/book`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(bookData)
  }).then(res => res.json());
}

function deleteBook(bookData) {
  return fetch(`${API_URL}/delete_book`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(bookData)
  }).then(res => res.json());
}

function getAllBooks() {
  console.log('Getting all books');
  return fetch(`${API_URL}/books`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(res => res.json());

  // const dict = {
  //   name: 'David Chang',
  //   email: 'davidchang@chegg.com'
  // };
  // return dict;
}

function postUserData(userData) {
  return fetch(`${API_URL}/edit_user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(quizResultsData)
  }).then(res => res.json());
}

function updatePassword(passwordData) {
  console.log(JSON.stringify(passwordData));
  return fetch(`${API_URL}/edit_password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(passwordData)
  }).then(res => res.json());

  // const dict = {
  //   message: 'Invalid password',
  //   status: 400,
  //   data: { status: 'failure' }
  // };
  // return dict;
}

export {
  register,
  login,
  search,
  getBooksByYearGrade,
  getROArchiveYears,
  getBookData,
  getQuizzes,
  createBook,
  postQuizResults,
  getAllBooks,
  deleteBook
  postQuizResults,
  getUserData,
  postUserData,
  updatePassword
};
