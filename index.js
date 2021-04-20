const init = require('./src');

const port = 8080;

(async () => {
  const app = await init();
  app.listen(port, () => {
    console.log({ msg: `Scoring-api is listening on port ${port}` });
  });
})();
