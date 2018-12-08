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

function getROCurrentYear() {
  return {
    success: true,
    result: {
      results: 2019
    },
    message: ''
  };
  // return fetch(`${API_URL}/currentReading`, {
  //   method: 'GET'
  // }).then(res => res.json());
}

function getROArchiveYears() {
  return fetch(`${API_URL}/years`, {
    method: 'GET'
  }).then(res => res.json());
}

function getBookData(id) {
  return fetch(`${API_URL}/books?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
}

function getQuizzes(bookID) {
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
    body: JSON.stringify(quizResultsData)
  }).then(res => res.json());
}

function getUserData() {
  return fetch(`${API_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify()
  }).then(res => res.json());
}

function createBook(bookData) {
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
  return fetch(`${API_URL}/books`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(res => res.json());
}

function postUserData(userData) {
  return fetch(`${API_URL}/edit_user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(userData)
  }).then(res => res.json());
}

function updatePassword(passwordData) {
  return fetch(`${API_URL}/edit_password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(passwordData)
  }).then(res => res.json());
}

function getBadges() {
  return fetch(`${API_URL}/badges`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(res => res.json());
}

function getAdvice() {
  return fetch(`${API_URL}/parent_advice`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(res => res.json());
}

function upgradeUser(user) {
  return fetch(`${API_URL}/upgrade_user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(user)
  }).then(res => res.json());
}

export {
  register,
  login,
  search,
  getBooksByYearGrade,
  getROCurrentYear,
  getROArchiveYears,
  getBookData,
  getQuizzes,
  createBook,
  postQuizResults,
  getAllBooks,
  deleteBook,
  getUserData,
  postUserData,
  updatePassword,
  getBadges,
  getAdvice,
  upgradeUser
};
