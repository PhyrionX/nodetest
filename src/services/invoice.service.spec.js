const axios = require('axios');
const sinon = require('sinon');
const invoiceService = require('./invoice.service');

describe('Invoice service', () => {
  it('get a invoice', () => {
    const get = sinon.stub(axios, 'get');
    invoiceService.getInvoice({
      invoiceId: 'a',
      authorization: 'b'
    });

    get.restore();

    sinon.assert.calledWith(
      get,
      'https://hr7tdqab73.execute-api.eu-west-1.amazonaws.com/dev/invoices/a',
      { headers: { Authorization: 'b' } } );
  });
});
