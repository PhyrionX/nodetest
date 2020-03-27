const axios = require('axios');

const getInvoice = ({ invoiceId, authorization }) => {
  return  axios.get('https://hr7tdqab73.execute-api.eu-west-1.amazonaws.com/dev/invoices/' + invoiceId, {
    headers: {
      Authorization: authorization
    }
  })
}

module.exports = Object.assign({}, { getInvoice });