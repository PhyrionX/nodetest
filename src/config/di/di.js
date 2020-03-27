const { createContainer, asValue } = require('awilix');

function initDI ({ serverSettings, services }, mediator) {
  mediator.once('init', () => {
    const container = createContainer();

    container.register({
      serverSettings: asValue(serverSettings),
      loginService: asValue(services.loginService),
      invoiceService: asValue(services.invoiceService)
    });

    mediator.emit('di.ready', container);
  })
}

module.exports.initDI = initDI;