const fs = require('fs-extra');
const path = require('path');

const INPUT_DIRECTORY = path.resolve(__dirname, '../zip');

const getFontDirectories = () => {
  const files = fs.readdirSync(INPUT_DIRECTORY);

  // Don't remove zip files
  return files.filter(
    name => !name.includes('.zip')
  );
};

const removeFolders = () => {

  const files = getFontDirectories();
  files.forEach(name => {
    fs.removeSync(`${INPUT_DIRECTORY}/${name}`);
  });
};

removeFolders();