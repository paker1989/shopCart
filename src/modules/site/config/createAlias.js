const fs = require('fs');
const path = require('path');

module.exports = function createAlias(packagesDir) {
  const packages = fs.readdirSync(packagesDir);
  return packages
    .filter(p => fs.statSync(path.join(packagesDir, p)).isDirectory())
    .reduce(function(alias, p) {
      alias[p] = path.posix.join(packagesDir, p);
      return alias;
    }, {});
}