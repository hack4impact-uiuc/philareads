import "whatwg-fetch";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://localhost:5000" // change this to prod endpoint
    : "http://localhost:5000";

function register(formData) {
  var a = fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  }).then(res => res.json());
  return a;
}

function login(formData) {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
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
  if (year === null && grade === null) {
    console.log(
      "getBooksByYearGrade did not receive a year or grade. You should use getBooks instead"
    );
  }
  const query = `year=${year ? year : ""}&grade=${grade ? grade : ""}`;
  return fetch(`${API_URL}/books?${query}`, {
    method: "GET"
  }).then(res => res.json());
}

function getROArchiveYears({ grade }) {
  const query = `grade=${grade ? grade : ""}`;
  return fetch(`${API_URL}/years?${query}`, {
    method: "GET"
  }).then(res => res.json());
}

export { register, login, search, getBooksByYearGrade, getROArchiveYears };
