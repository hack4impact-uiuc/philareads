import 'whatwg-fetch';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://localhost:5000' // change this to prod endpoint
    : 'http://localhost:5000';

function register(formData) {
  return fetch(`${API_URL}/register`, {
    method: 'POST',
    body: formData
  })
    .then(res => console.log(res.json()))
    .catch(e => {
      console.log(e);
    });
}

export default register;
