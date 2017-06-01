var assert = require('assert');
var fs = require('fs');
var cp = require('child_process');
var pkg = require('../package.json');
var beautifier = pkg.bin["pug-beautifier"];
// test jade files
var before_jade = 'test/before/test.jade';
var true_false_4_jade = 'test/after/test_true_false_4.jade';
var false_true_2_jade = 'test/after/test_false_true_2.jade';
var result_jade = 'test/result.jade';

describe('Option test', function() {
  it('-h should work.', function(done) {
    cp.execFile(beautifier, ['-h'], function(err, stdout, stderr) {
      assert.ifError(err);
      done();
    });
  });
  it('-V should work.', function(done) {
    cp.execFile(beautifier, ['-V'], function(err, stdout, stderr) {
      assert.ifError(err);
      assert.equal(pkg.version, stdout.trim());
      done();
    });
  });
  it('When no tabsize, -s should throw error.', function(done) {
    cp.execFile(beautifier, ['-s', before_jade], function(err, stdout, stderr) {
      assert.ok(err);
      done();
    });
  });
});

describe('File test', function() {
  it('Default(filltab=true,omitdiv=false,tabsize=4) should work.', function(done) {
    cp.execFile(beautifier, [before_jade], function(err, stdout, stderr) {
      assert.ifError(err);
      fs.readFile(true_false_4_jade, 'utf8', function(err, code) {
        assert.ifError(err);
        assert.equal(code.trim(), stdout.trim());
        done();
      });
    });
  });

  it('Stdin(with depault options) should work.', function(done) {
    cp.exec('cat ' + before_jade + ' | ' + beautifier, function(err, stdout, stderr) {
      assert.ifError(err);
      fs.readFile(true_false_4_jade, 'utf8', function(err, code) {
        assert.ifError(err);
        assert.equal(code.trim(), stdout.trim());
        done();
      });
    });
  });

  it('Filltab=false,omitdiv=true,tabsize=2 should work.', function(done) {
    cp.execFile(beautifier, ['-s', '2', '-d', before_jade], function(err, stdout, stderr) {
      assert.ifError(err);
      fs.readFile(false_true_2_jade, 'utf8', function(err, code) {
        assert.ifError(err);
        assert.equal(code.trim(), stdout.trim());
        done();
      });
    });
  });
});
