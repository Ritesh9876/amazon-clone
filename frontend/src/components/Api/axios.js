import axios from "axios";

// const instance = axios.create({
//   // THE API (cloud function) URL
//   baseURL: 'https://us-central1-challenge-4b2b2.cloudfunctions.net/api'
//     // "http://localhost:5001/challenge-4b2b2/us-central1/api",
// });

export default axios.create({
  baseURL: 'http://127.0.0.1:5001/ritbackend/us-central1/api'
});
