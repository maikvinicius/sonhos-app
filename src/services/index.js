import axios from 'axios'

const api = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Accept-Language': 'pt-BR'
  },
  baseURL: 'https://sonhos-api.herokuapp.com'
});

export default api;
