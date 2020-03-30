const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const invoiceApi = require('../api/invoice');
const loginApi = require('../api/login');
// const axios = require('axios')

const start = (container) => {
  return new Promise((resolve, reject) => {
    const { port } = container.resolve('serverSettings');
    const app = express();

    if (!port) {
      reject(new Error('The server must be started with an available port'))
    }

    app.use(bodyparser.json())
    app.use(cors())
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send('Something went wrong!')
      next()
    })
    app.use((req, res, next) => {
      req.container = container.createScope()
      next()
    })
    
    invoiceApi(app);
    loginApi(app);
    
    const server = app.listen(port, () => resolve(server)) 
  })
}

module.exports = Object.assign({}, { start });
