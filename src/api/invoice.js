module.exports = (app) => {
  app.get('/invoice/:invoiceId', (req, res) => {
    const invoiceService = req.container.resolve('invoiceService');
    const { invoiceId } = req.params;
    const { authorization } = req.headers;

    if(invoiceId && authorization) {
      invoiceService.getInvoice({ invoiceId, authorization })
        .then(({data: {data}}) => {
          return invoiceService.sendInvoice({
            invoice: {
              ...data,
              customer: data.client,
              date: new Date().toString(),
              invoice: invoiceId,
              total: data.lineItems.reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0),
              lineItems: data.lineItems.map((lineProduct) => ({
                ...lineProduct,
                price: lineProduct.quantity * lineProduct.unitPrice
              }))
            },
            authorization
          })
        })
        .then(({ data }) => {
          console.log(data);
          
          res.status(200).send(data)
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        });
    } else {
      res.status(400).send('Error in parameters or authorization');
    }
  });
}