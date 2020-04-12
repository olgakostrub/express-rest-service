const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const logger = require('./middleware/logger');
const { errorHandler } = require('./middleware/errors');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(logger.logRequest);
app.use(errorHandler);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

process.on('uncaughtException', err => {
  logger.logError({
    message: err.message || 'Uncaught exception',
    status: err.status || INTERNAL_SERVER_ERROR
  });
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  logger.logError({
    message: 'Unhandled rejection' || reason.message,
    status: INTERNAL_SERVER_ERROR
  });
});

module.exports = app;
