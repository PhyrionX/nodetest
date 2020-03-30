const { createContainer, asValue } = require('awilix');
const request = require('supertest');
const services = require('../services');
const server = require('../server/server');

describe('Invoice API', () => {
  let app = null;

  const serverSettings = {
    port: 3000
  }

  beforeEach(() => {
    const container = createContainer();

    container.register({
      serverSettings: asValue(serverSettings),
      invoiceService: asValue(services.invoiceService)
    })

    return server.start(container)
      .then(serv => {
        app = serv
      })
  });

  afterEach(() => {    
    app.close();
    app = null;
  });

  it('can get invoice', (done) => {
    const result = {
      id: 'I-00028988',
      client: 'C-BN99',
      lineItems: [
        {
          department: 'D-959M',
          product: 'P-IM949',
          quantity: 2,
          unitPrice: 44
        },
        {
          department: 'D-959M',
          product: 'P-IM889',
          quantity: 5,
          unitPrice: 12
        },
        {
          department: 'D-989M',
          product: 'P-IM559',
          quantity: 1,
          unitPrice: 100
        }
      ],
      status: 'sent'
    }

    request(app)
      .get('/invoice/I-00028988')
      .set('authorization', 'Bearer 666a666a666') // Works.
      .expect((res) => {
        res.body.should.containEql(result);
      })
      .expect(200, done)
  });
});
