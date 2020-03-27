module.exports = (app) => {
  app.post('/login', (req, res) => {
    const loginService = req.container.resolve('loginService');
    const { username, password } = req.body;

    if (username && password){
      loginService.login({ username, password })
        .then(({ data }) => res.status(200).send(data))
        .catch((err) => res.status(400).send(err))
    } else {
      res.status(400).send('Authentication error');
    }
  });
}