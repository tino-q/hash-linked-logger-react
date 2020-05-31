const axios = require('axios').default;

const errorHandler = error => {
  if (error.response) {
    throw error.response.data.internal_code;
  }
  throw error;
};

export function get(url) {
  return axios.get(url).catch(errorHandler);
}

export function post(url, body) {
  return axios.post(url, body).catch(errorHandler);
}
