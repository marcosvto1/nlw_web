import axios from 'axios';

const URL = window.location.hostname.includes('localhost') ? 
'http://localhost:3333' : 
'https://proffy.herokuapp.com';

const api = axios.create({
  baseURL: URL
});

export default api;