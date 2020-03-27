const {EventEmitter} = require('events')
const assert = require('assert')
const {init} = require('./')

describe('DI configuration', () => {
  it('can init dependencies to the container', (done) => {
    const mediator = new EventEmitter()

    mediator.on('di.ready', (container) => {
      assert.notEqual(container.resolve('loginService'), null);
      assert.notEqual(container.resolve('invoiceService'), null);
      assert.equal(container.resolve('serverSettings').port, 3000);
      done()
    })

    init(mediator)

    mediator.emit('init')
  })
})