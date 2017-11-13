const config = require('./config');

const { PORT, HOST, PROTOCOL } = config;

const listen = server =>
  new Promise((resolve, reject) => {
    const handler = server.listen(PORT, HOST, error => {
      if (error) {
        reject(error);
        return;
      }
      resolve(handler);
      console.log(`Server listening at ${PROTOCOL}://${HOST}:${PORT}`);
    });
  });

module.exports = listen;
