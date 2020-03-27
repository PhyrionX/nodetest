module.exports = (app) => {
  app.get('/invoice/:invoiceId', (req, res) => {
    const invoiceService = req.container.resolve('invoiceService');
    const { invoiceId } = req.params;
    const { authorization } = req.headers;

    if(invoiceId && authorization) {
      invoiceService.getInvoice({ invoiceId, authorization })
        .then(({data: {data}}) => res.status(200).send(data))
        .catch((err) => res.status(400).send(err))
    } else {
      res.status(400).send('Error in parameters or authorization');
    }
  });
}