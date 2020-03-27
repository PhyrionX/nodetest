const axios = require('axios');

const login = ({ username, password }) => {
  return axios.post('https://hr7tdqab73.execute-api.eu-west-1.amazonaws.com/dev/login', 
    {
      username,
      password
    })
}

module.exports = Object.assign({}, { login });