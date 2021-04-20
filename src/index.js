const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');
const bodyParser = require('body-parser');

const app = express();

// If there is no limit on the size of requests,
// attackers can send requests with large request bodies
// that can exhaust server memory and/or fill disk space.
// For more: https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html
app.use(express.json({ limit: '1kb' }));

const apiSpec = path.join(__dirname, 'swagger.yml');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use('/swagger', express.static(apiSpec));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function init() {
  app.use(
    OpenApiValidator.middleware({
      apiSpec,
      validateResponses: true,
      operationHandlers: path.join(__dirname),
    }),
  );

  app.use((err, req, res) => {
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  });

  return app;
}

module.exports = init;
