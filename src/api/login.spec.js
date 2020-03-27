const { createContainer, asValue } = require('awilix');
const request = require('supertest')
const services = require('../services');
const server = require('../server/server');

describe('Login API', () => {
  let app = null;

  const serverSettings = {
    port: 3000
  }

  beforeEach(() => {
    const container = createContainer();

    container.register({
      serverSettings: asValue(serverSettings),
      loginService: asValue(services.loginService)
    })

    return server.start(container)
      .then(serv => {
        app = serv
      })
  })

  afterEach(() => {    
    app.close();
    app = null;
  })

  it('can get a authentication token', (done) => {
    const result = {
      token: '666a666a666'
    }

    request(app)
      .post('/login')
      .send({
        username: 'billin-test',
        password: '1234567890a'
      }) // Works.
      .expect((res) => {
        res.body.should.containEql(result);
      })
      .expect(200, done)
  })
})