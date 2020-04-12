const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const logger = require('./logger');

class ValidationError extends Error {
  constructor(error) {
    super();
    this.status = error.status;
    this.message = error.message || getStatusText(status);
  }
}

function errorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(err.status).send(err.message);
    return;
  }
  logger.logError(err);
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
  next();
}

module.exports = { errorHandler, ValidationError };
