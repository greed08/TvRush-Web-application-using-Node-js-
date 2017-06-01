#!/usr/bin/env node

'use strict';

var fs = require('fs');
var program = require('commander');
var beautify = require('pug-beautify');

var options = {};

var quit = function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    process.exit(0);
  }
};

program
  .version(require('./package.json').version)
  .usage('[options] [file]')
  .option('-s, --fillspace <tab_size>', 'fill <tab_size> spaces rather than tab, default tab', parseInt)
  .option('-d, --omitdiv', 'omit div tag, default not.')
  .option('-e, --encoding <encoding>', '<encoding>, default utf8')
  .option('-o, --overwrite', 'overwrite input file, default stdout')
  .parse(process.argv);

options.fill_tab = (typeof program.fillspace === 'undefined') ? true : false;
options.tab_size = (typeof program.fillspace === 'undefined') ? 4 : program.fillspace;
if(isNaN(options.tab_size)) quit(new Error('invalid tab_size'));
options.omit_div = (typeof program.omitdiv === 'undefined') ? false : program.omitdiv;
options.encoding = (typeof program.encoding === 'undefined') ? 'utf8' : program.encoding;

options.overwrite = (typeof program.overwrite === 'undefined') ? false : program.overwrite;
options.file = program.args[0];

// console.log(program);
// console.log('-------');
// console.log(options);

var callback = function(err, code) {
  if (err) quit(err);
  var output = beautify(code, options);

  if (options.overwrite) {
    fs.writeFile(options.file, output, options.encoding, quit);
  } else {
    console.log(output);
    quit();
  }
};
// program start here.
try {
  if (program.args.length === 0) { // there's no file from args
    var code = '';
    process.stdin
      .setEncoding(options.encoding)
      .on('data', function(chunk) {
        code += chunk;
      })
      .on('end', function() {
        callback(null, code);
      })
      .resume();
  } else {
    fs.readFile(options.file, options.encoding, callback);
  }
} catch (err) {
  quit(err);
}
