/**
 * `scripts/preview.js` is used to run a local server to preview all complied fonts
 */

const httpServer = require('http-server');
const { spawn } = require('child_process');
const port = process.env.PORT || 8081;

const server = httpServer.createServer({
  root: __dirname,
  cache: -1,
  robots: true,
});

server.listen(port, () => {
  console.log(`Server started at: http://localhost:${port}/`);
  spawn('open', [`http://localhost:${port}/`]);
});
