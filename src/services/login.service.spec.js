const axios = require('axios');
const sinon = require('sinon');
const loginService = require('./login.service');

describe('Login service', () => {
  it('login', () => {
    const post = sinon.stub(axios, 'post');
    loginService.login({
      username: 'user-test',
      password: 'password-test'
    });

    post.restore();

    sinon.assert.calledWith(
      post,
      'https://hr7tdqab73.execute-api.eu-west-1.amazonaws.com/dev/login',
      {
        username: 'user-test',
        password: 'password-test'
      } );
  })
});
