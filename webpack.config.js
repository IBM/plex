const path = require('path');

module.exports = {
  mode: 'production',
  entry : './scripts/load-non-latin-plex.js',
  output : {
    path: path.resolve(__dirname, 'cdn/'),
    filename: 'load-non-latin-plex.js',
    clean: false
  }
}