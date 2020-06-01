/**
 * `scripts/export-css.js` is used to help generate all the sass files that we
 * need for each font family, supported weight, and unicode range.
 */

import fs from 'fs-extra';
import path from 'path';

const OUTPUT_DIRECTORY = path.resolve(__dirname, '../zip');

const getFontDirectories = () => {
  const files = fs.readdirSync(path.resolve('.'));

  // Don't build Variable fonts for now
  return files.filter(
    (name) => name.includes('IBM-Plex') && !name.includes('Variable')
  );
};

type file = { name: string; path: string };
type folder = { name: string; files: file[] };

const globDirectory = (type: 'otf' | 'ttf') => {
  const folders = new Array<folder>();
  const files = getFontDirectories();

  files.forEach((name) => {
    const list = new Array<file>();

    let p = `${name}/fonts/complete/${type}`;
    if (!fs.pathExistsSync(p)) {
      p = `${name}/fonts/${type}`;
    }
    const fonts = fs.readdirSync(path.resolve(p));

    fonts.forEach((f) =>
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

const writeZip = (typeName: string, folders: folder[]) => {
  fs.ensureDirSync(OUTPUT_DIRECTORY);

  fs.removeSync(`${OUTPUT_DIRECTORY}/${typeName}`);

  fs.ensureDirSync(`${OUTPUT_DIRECTORY}/${typeName}`);

  folders.forEach((folder: folder) => {
    fs.ensureDirSync(`${OUTPUT_DIRECTORY}/${typeName}/${folder.name}`);
    folder.files.forEach((f) => {
      const fontFile = fs.readFileSync(f.path);
      const p = path.resolve(
        `${OUTPUT_DIRECTORY}/${typeName}/${folder.name}/${f.name}`
      );
      fs.writeFileSync(p, fontFile);
    });
  });
};

const writeWebFiles = () => {
  fs.ensureDirSync(`${OUTPUT_DIRECTORY}/Web`);
  const files = getFontDirectories();
  files.forEach((name) => {
    console.log(` Write ${name}`);
    fs.ensureDirSync(`${OUTPUT_DIRECTORY}/Web/${name}`);
    fs.copySync(`${name}/fonts`, `${OUTPUT_DIRECTORY}/Web/${name}/fonts`);
  });

  fs.copySync('css', `${OUTPUT_DIRECTORY}/Web/css`);
  fs.copySync('scss', `${OUTPUT_DIRECTORY}/Web/scss`);
  fs.copySync('LICENSE.txt', `${OUTPUT_DIRECTORY}/Web/LICENSE.txt`);
  fs.copySync('CHANGELOG.md', `${OUTPUT_DIRECTORY}/Web/CHANGELOG.md`);
};

const zip = (target: 'OpenType' | 'Web' | 'TrueType') => {
  console.log(` Zipping ${target}`);
  return `zip -qr ${target}.zip ${target}\n`;
};

const compressAll = () => {
  console.log('Compressing');

  let s = '';
  s += zip('OpenType');
  s += zip('TrueType');
  s += zip('Web');

  console.log('\n###########################\n');

  console.log('Run this to generate zip files for git release \n');
  console.log('cd zip');
  console.log(s);
};

writeZip('OpenType', globDirectory('otf'));

writeZip('TrueType', globDirectory('ttf'));

writeWebFiles();

compressAll();
