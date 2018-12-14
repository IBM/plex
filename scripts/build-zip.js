/**
 * `scripts/export-css.js` is used to help generate all the sass files that we
 * need for each font family, supported weight, and unicode range.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const branch = require('git-branch');
const execFile = require('child_process').execFile;
const exec = require('child_process').exec;
const archiver = require('archiver');

const DBUG = false;
const OUTPUT_DIRECTORY = path.resolve(__dirname, '../zip');

const getFontDirectories = () => {
  const files = fs.readdirSync(path.resolve('.'));
  return files.filter(name => {
    const r = new RegExp(/IBM\-Plex/);
    return r.test(name);
  });
};

const globDirectory = type => {
  const folders = [];

  DBUG && console.log(`Glob ${type}`);

  const files = getFontDirectories();
  files.forEach(name => {
    const list = [];

    let p = `${name}/fonts/complete/${type}`;
    if (!fs.pathExistsSync(p)) {
      p = `${name}/fonts/${type}`;
    }
    const fonts = fs.readdirSync(path.resolve(p));

    fonts.forEach(f =>
      list.push({
        name: f,
        path: `${p}/${f}`,
      })
    );

    folders.push({
      name: name,
      files: list,
    });
  });

  return folders;
};
const writeZip = (typeName, folders) => {
  DBUG && console.log(`Write ${typeName}`);

  fs.ensureDirSync(OUTPUT_DIRECTORY);

  fs.removeSync(`${OUTPUT_DIRECTORY}/${typeName}`);
  fs.ensureDirSync(`${OUTPUT_DIRECTORY}/${typeName}`);
  folders.forEach(folder => {
    fs.ensureDirSync(`${OUTPUT_DIRECTORY}/${typeName}/${folder.name}`);
    folder.files.forEach(f => {
      const fontFile = fs.readFileSync(f.path);
      const p = path.resolve(
        `${OUTPUT_DIRECTORY}/${typeName}/${folder.name}/${f.name}`
      );
      fs.writeFileSync(p, fontFile);
    });
  });
};

const writeWebFiles = () => {
  DBUG && console.log(`Glob Web`);

  fs.ensureDirSync(`${OUTPUT_DIRECTORY}/Web`);
  const files = getFontDirectories();
  files.forEach(name => {
    DBUG && console.log(` Write ${name}`);
    fs.ensureDirSync(`${OUTPUT_DIRECTORY}/Web/${name}`);
    fs.copySync(`${name}/fonts`, `${OUTPUT_DIRECTORY}/Web/${name}/fonts`);
  });

  DBUG && console.log(` Write extras`);
  fs.copySync('css', `${OUTPUT_DIRECTORY}/Web/css`);
  fs.copySync('scss', `${OUTPUT_DIRECTORY}/Web/scss`);
  fs.copySync('LICENSE.txt', `${OUTPUT_DIRECTORY}/Web/LICENSE.txt`);
  fs.copySync('CHANGELOG.md', `${OUTPUT_DIRECTORY}/Web/CHANGELOG.md`);
};

const writeSourceFiles = async () => {
  DBUG && console.log(`Glob Source`);

  fs.removeSync(`${OUTPUT_DIRECTORY}/Source Code`);
  fs.ensureDirSync(`${OUTPUT_DIRECTORY}/Source Code`);

  const fileName = branch.sync();
  fs.ensureDirSync(`${OUTPUT_DIRECTORY}/Source Code/${fileName}`);

  let ignoredFiles = fs.readFileSync('.gitignore', 'utf-8');
  ignoredFiles = ignoredFiles.split('\n').filter(i => (i || '').trim());

  let files = fs.readdirSync(path.resolve('.'));
  files = files.filter(name => !ignoredFiles.includes(name));
  files = files.filter(name => name[0] !== '.');
  files = files.filter(name => !['yarn.lock'].includes(name));
  files.forEach(file => {
    DBUG && console.log(` Write ${file}`);
    fs.copySync(file, `${OUTPUT_DIRECTORY}/Source Code/${fileName}/${file}`);
  });
};

const zip = target => {
  const f = target;
  DBUG && console.log(` Zipping ${f}`);
  return `zip -qr ${f}.zip ${f}\n`;
};
const tar = target => {
  const f = target;
  DBUG && console.log(` Taring ${f}`);
  return `tar -zcf ${f}.tar.gz ${f} >/dev/null 2>&1 \n`;
};

const compressAll = () => {
  DBUG && console.log('Compressing');

  let s = '';
  s += zip('OpenType');
  s += zip('TrueType');
  s += zip('Web');

  // const fileName = branch.sync();
  // s += zip(`Source\\ Code/${fileName}`);
  // s += tar(`Source\\ Code/${fileName}`);

  DBUG && console.log('\n###########################\n');

  console.log('Run this to generate zip files for git release \n');
  console.log('cd zip');
  console.log(s);
};

writeZip('OpenType', globDirectory('otf'));

writeZip('TrueType', globDirectory('ttf'));

writeWebFiles();

// writeSourceFiles();

compressAll();
