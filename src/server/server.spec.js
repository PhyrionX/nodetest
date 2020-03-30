/* eslint-env mocha */
const { createContainer } = require('awilix');
const server = require('./server');
const should = require('should');

describe('Server', () => {
  const container = createContainer();

  it('should require a port to start', () => {
    return server.start(container).should.be.rejected();
  });
});
