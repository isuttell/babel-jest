var babel = require("babel-core");
var minimatch = require("minimatch");

/**
 * Local the package.json in the cwd and then read check to see if we have
 * any specific include/exclude options
 * @param  {String} filename
 * @return {Boolean}
 */
function shouldInclude(filename) {
  var pkg = require(process.cwd() + "/package.json");

  if (pkg && pkg.babelJest && pkg.babelJest.include instanceof Array) {
    // If we can find the settings use those patterns
    var include = pkg.babelJest.include.some(function(pattern){
      return minimatch(filename, process.cwd() + '/' + pattern);
    });

    if (pkg.babelJest.exclude instanceof Array) {
      // Check to see if we match an exclude rules
      var exclude = pkg.babelJest.exclude.some(function(pattern){
        return minimatch(filename, process.cwd() + '/' + pattern);
      });

      // Should we exclude the file
      include = exclude ? false : include;
    }

    return include;
  } else {
    // Ignore all files within node_modules
    return filename.indexOf("node_modules") === -1;
  }
}

module.exports = {
  process: function (src, filename) {
    if (minimatch(filename, '*.css', {
      matchBase: true
    })) {
      return 'module.exports = {};';
    } else if (shouldInclude(filename) && babel.util.canCompile(filename)) {
      return babel.transform(src, {
        filename: filename,
        retainLines: true
      }).code;
    }

    return src;
  }
};
