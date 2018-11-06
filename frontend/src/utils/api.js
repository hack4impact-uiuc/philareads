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
  // return fetch(`${API_URL}/books?id=${id}`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(id)
  // }).then(res => res.json());

  const mockAPI = {
    id: 84,
    name: 'Cracking The PM Interview',
    author: 'Gayle Laakmann McDowell',
    grade: 8,
    cover_url:
      'https://images-na.ssl-images-amazon.com/images/I/418FvJBCq3L._SX331_BO1,204,203,200_.jpg',
    reader_url: 'https://onlinereader.com/books/crackingpm.pdf',
    year: 2018,
    quizzes: [
      {
        id: 2,
        name: 'Huck Finn',
        questions: [
          {
            id: 84,
            text: "Who wrote 'Huckleberry Finn'?",
            options: [
              'J.K. Rowling',
              'Steinbeck',
              'Tony Morrison',
              'Mark Twain'
            ]
          }
        ]
      }
    ]
  };
  return mockAPI;
}
function getQuizzes() {
  const mockAPI = [
    {
      id: 2,
      name: 'Huck Finn',
      questions: [
        {
          text: "Who wrote 'Huckleberry Finn'?",
          options: ['J.K. Rowling', 'Steinbeck', 'Tony Morrison', 'Mark Twain'],
          correct_option: 'Mark Twain'
        },
        {
          text: "Who is Huckleberry Finn's Best Friend?",
          options: ['Tom Sawyer', 'His dad', 'Jake Wiggins', 'His dog'],
          correct_option: 'Tom Sawyer'
        }
      ]
    },

    {
      id: 5,
      name: 'Acing the PM Interview',
      questions: [
        {
          text: "Who wrote 'Acing the PM Interview'?",
          options: ['J.K. Rowling', 'Steinbeck', 'Tony Morrison', 'Mark Twain'],
          correct_option: 'J.K. Rowling'
        },
        {
          text: 'Who is Acing the PM Interview?',
          options: ['Tom Sawyer', 'His dad', 'A thing', 'His dog'],
          correct_option: 'A thing'
        }
      ]
    }
  ];
  return mockAPI;
}
export { register, login, search, getBooksByYearGrade, getROArchiveYears, getBookData, getQuizzes };
