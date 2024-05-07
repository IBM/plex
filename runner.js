const execSync = require('child_process').execSync;
const args = require('minimist')(process.argv.slice(2));
const families = require('./scripts/data/families');
const fs = require('fs-extra');

const familiesFromArgs = args.families ? [args.families] : args._;

const familiesData = familiesFromArgs.length ? families.filter(({ packageName }) => {

  return familiesFromArgs.includes(packageName);
  
}) : families;

if (familiesData.length === 0) {

  console.error('No families found. Must be one of: ');
  console.log(families.map(({ packageName }) => packageName));
  process.exit(1);
}

fs.outputFileSync(`scripts/families.json`, JSON.stringify({
  data: familiesData
}), 'utf8');

execSync('yarn build:output', {stdio:[0, 1, 2]});