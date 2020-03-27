const { EventEmitter } = require('events');
const server =  require('./server/server');
const di = require('./config');
const mediator = new EventEmitter();

console.log('--- Billin Service ---');

mediator.on('di.ready', (container) => {
  server.start(container)
  .then(() => {
    console.log(`Server started succesfully in port: ${container.cradle.serverSettings.port}.`);
  })
})

di.init(mediator);

mediator.emit('init');
