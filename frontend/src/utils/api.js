import 'whatwg-fetch';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://localhost:5000' // change this to prod endpoint
    : 'http://localhost:5000';

function register(formData) {
  var a = fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then(res => res.json());
  return a;
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
  return {
    success: true,
    result: [
      {
        name: 'asl',
        author: 'asl',
        grade: 1,
        year: 1
      },
      {
        name: 'asl',
        author: 'asl',
        grade: 1,
        year: 1
      }
    ],
    message: ''
  };
  // const query = `search_string=${searchString}`;
  // return fetch(`${API_URL}/books?${query}`, {
  //   method: "GET"
  // }).then(res => res.json());
}

export { register, login, search };
