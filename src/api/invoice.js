module.exports = (app) => {
  app.get('/invoice/:invoiceId/advanced', async(req, res) => {
    const invoiceService = req.container.resolve('invoiceService');
    const { invoiceId } = req.params;
    const { authorization } = req.headers;

    if(invoiceId && authorization) {
      try {
        const { data: { data: invoice } } = await invoiceService.getInvoice({ invoiceId, authorization });
        const { data: { data: client } } = await invoiceService.getClients({ clientId: invoice.client, authorization });
        let advancedInvoice = {
          customer: invoice.client,
          date: new Date().toString(),
          invoice: invoiceId,
          customerName: client.fiscalName,
          customerEmail: client.email,
          customerNIT: client.fiscalNumber,
          total: invoice.lineItems.reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0),
        }
        let lineItems = []; 

        for (index in invoice.lineItems) {
          const lineItem = invoice.lineItems[index];
          const { data: { data: product } }  = await invoiceService.getProduct({ productId: lineItem.product, authorization });
          const { data: { data: department } } = await invoiceService.getDepartment({ departmentId: lineItem.department, authorization });
          
          
          lineItems = [ 
            ...lineItems, 
            {
              ...lineItem,
              productDescription: product.name,
              price: lineItem.quantity * lineItem.unitPrice,
              departmentName: department.description
            }
          ]
        }

        advancedInvoice = {
          ...advancedInvoice,
          lineItems
        };

        const { data: result } = await invoiceService.sendInvoice({ invoice: advancedInvoice, authorization, advanced: true });
      
        res.status(200).send(result.message);
      } catch (err) {
        res.status(400).send(err);
      }
    } else {
      res.status(400).send('Error in parameters or authorization');
    }
  });

  app.get('/invoice/:invoiceId', async(req, res) => {
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
              customerName: '',
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