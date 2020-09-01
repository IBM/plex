/**
 * `scripts/export-css.js` is used to help generate all the sass files that we
 * need for each font family, supported weight, and unicode range.
 */

const fs = require('fs-extra');
const path = require('path');

const OUTPUT_DIRECTORY = path.resolve(__dirname, '../zip');

const getFontDirectories = () => {
  const files = fs.readdirSync(path.resolve('.'));

  // Don't build Variable fonts for now
  return files.filter(
    name => name.includes('IBM-Plex') && !name.includes('Variable')
  );
};

const globDirectory = type => {
  const folders = [];

  const files = getFontDirectories();
  files.forEach(name => {
    const list = [];

    let p = `${name}/fonts/complete/${type}`;
    if (!fs.pathExistsSync(p)) {
      p = `${name}/fonts/${type}`;
    }

    if (!fs.pathExistsSync(p)) {
      console.log(`No path exists at ${p}`);
      return;
    }

    const fonts = fs.readdirSync(path.resolve(p));

    fonts.forEach(f =>
      list.push({
        name: f,
        path: `${p}/${f}`,
      })
    );

    folders.push({
      name,
      files: list,
    });
  });

  return folders;
};

const writeZip = (typeName, folders) => {
  fs.ensureDirSync(OUTPUT_DIRECTORY);

  fs.removeSync(`${OUTPUT_DIRECTORY}/${typeName}`);
  fs.ensureDirSync(`${OUTPUT_DIRECTORY}/${typeName}`);
  folders.forEach(folder => {
    fs.ensureDirSync(`${OUTPUT_DIRECTORY}/${typeName}/${folder.name}`);
    folder.files.forEach(f => {
      const source = f.path;
      const dest = `${OUTPUT_DIRECTORY}/${typeName}/${folder.name}/${f.name}`;
      fs.copySync(source, dest);
    });
  });
};

const writeWebFiles = () => {
  fs.ensureDirSync(`${OUTPUT_DIRECTORY}/Web`);
  const files = getFontDirectories();
  files.forEach(name => {
    fs.ensureDirSync(`${OUTPUT_DIRECTORY}/Web/${name}`);
    fs.copySync(`${name}/fonts`, `${OUTPUT_DIRECTORY}/Web/${name}/fonts`);
  });

  fs.copySync('css', `${OUTPUT_DIRECTORY}/Web/css`);
  fs.copySync('scss', `${OUTPUT_DIRECTORY}/Web/scss`);
  fs.copySync('LICENSE.txt', `${OUTPUT_DIRECTORY}/Web/LICENSE.txt`);
  fs.copySync('CHANGELOG.md', `${OUTPUT_DIRECTORY}/Web/CHANGELOG.md`);
};

const zip = target => {
  const f = target;
  return `zip -qr ${f}.zip ${f}\n`;
};

writeZip('OpenType', globDirectory('otf'));

writeZip('TrueType', globDirectory('ttf'));

writeWebFiles();
