function logRequest(req, res, next) {
  const curDateTime = new Date().toISOString();
  console.log(`Request received on ${curDateTime}`);
  console.log('Method:', req.method, 'url:', req.url, 'query:', req.query);
  console.log('Body:', req.body, '\n');
  next();
}

function logError(err) {
  console.error('Error: ', err.status);
  if (err.type) {
    console.error('Error type:', err.type);
  }
  console.error('Message:', err.message, '\n');
}

module.exports = {
  logRequest,
  logError
};
