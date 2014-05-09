#!/usr/bin/env node
var fs = require('fs');
var manifest = null;
var usage = 'Usage: mini-man manifest.webapp http://package-path.zip > manifest.mini';

function exit (msg) {
  if (msg) console.error(msg);
  process.exit(1);
};

if (process.argv.length < 4) exit(usage);

if (!fs.existsSync(process.argv[2])) exit(process.argv[2] + ': file not found');

var manifestFile = fs.readFileSync(process.argv[2], { encoding: 'utf-8' });

try {
  manifest = JSON.parse(manifestFile);
} catch (e) {
  exit(process.argv[2] + ': file not parsable JSON');
}

if ('package_path' in manifest) exit('package_path already exists');

manifest.package_path = process.argv[3];

if ('installs_allowed_from' in manifest) manifest.installs_allowed_from = ['*'];

console.log(JSON.stringify(manifest, null, 2));

