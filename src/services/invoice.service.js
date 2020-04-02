const axios = require('axios');

const getInvoice = ({ invoiceId, authorization }) => {
  return  axios.get('https://hr7tdqab73.execute-api.eu-west-1.amazonaws.com/dev/invoices/' + invoiceId, {
    headers: {
      Authorization: authorization
    }
  })
}

const sendInvoice = ({ invoice, authorization, advanced }) => {
  return  axios.post(`https://hr7tdqab73.execute-api.eu-west-1.amazonaws.com/dev/printer/${ advanced ? 'advanced' : 'basic' }/`, invoice, {
    headers: {
      Authorization: authorization
    }
  })
}

module.exports = Object.assign({}, { getInvoice, sendInvoice });