/**
 * `scripts/preview.js` is used to run a local server to preview all complied fonts
 */

const server = require('server');
const spawn = require('child_process').spawn;
const { get } = server.router;
const { render } = server.reply;
const port = process.env.PORT || 8081;


console.log(`Server started at: http://localhost:${port}/`);
spawn('open', [`http://localhost:${port}/`]);

server({ port }, [
  get('/', ctx => render("./index.html"))
]);