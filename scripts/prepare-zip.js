const fs = require('fs-extra');
const path = require('path');

const OUTPUT_DIRECTORY = path.resolve(__dirname, '../zip');

const getFontDirectories = () => {
  const files = fs.readdirSync(path.resolve('./packages/'));

  // Don't build Variable fonts for now
  return files.filter(
    name => name.includes('plex-') && !name.includes('variable')
  );
};

const globDirectory = type => {

  const folders = [];

  const files = getFontDirectories();
  files.forEach(name => {
    const list = [];

    let p = `packages/${name}/fonts/complete/${type}`;
    if (!fs.pathExistsSync(p)) {
      p = `packages/${name}/fonts/${type}`;
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
}

/*const writeZip = (typeName, folders) => {
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
};*/

const writeFiles = () => {

  const files = getFontDirectories();

  files.forEach(name => {

    //fs.ensureDirSync(`${OUTPUT_DIRECTORY}/Web`);
    //fs.ensureDirSync(`${OUTPUT_DIRECTORY}/Web/${name}`);

    //fs.copySync(`packages/${name}/fonts`, `${OUTPUT_DIRECTORY}/Web/${name}/fonts`);

    fs.ensureDirSync(`${OUTPUT_DIRECTORY}/ibm-${name}`);

    fs.copySync(`packages/${name}/fonts`, `${OUTPUT_DIRECTORY}/ibm-${name}/fonts`);

    fs.copySync(`packages/${name}/css`, `${OUTPUT_DIRECTORY}/ibm-${name}/css`);
    fs.copySync(`packages/${name}/scss`, `${OUTPUT_DIRECTORY}/ibm-${name}/scss`);
    fs.copySync('LICENSE.txt', `${OUTPUT_DIRECTORY}/ibm-${name}/LICENSE.txt`);
    //fs.copySync('CHANGELOG.md', `${OUTPUT_DIRECTORY}/${name}/CHANGELOG.md`);

  });
}

//writeZip('OpenType', globDirectory('otf'));

//writeZip('TrueType', globDirectory('ttf'));

writeFiles();