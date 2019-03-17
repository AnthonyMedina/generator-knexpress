const apiRouter = require('express').Router();

apiRouter.get('/', (req, res) => {
  res.send({ ok: true });
});

module.exports = apiRouter;
