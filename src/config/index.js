const { serverSettings } = require('./config');
const { initDI } = require('./di');
const services = require('../services');

const init = initDI.bind(null, { serverSettings, services });

module.exports = Object.assign({}, { init });

