'use strict';

var path = require('path'),
    fs = require('fs'),
    pngquantPath = require('../lib/node-pngquant-bin.js').path,
    execFile = require('child_process').execFile,

    oldPath = path.join(__dirname, 'fixtures', 'pngquant-logo.png'),
    newPath = path.join(__dirname, 'fixtures', 'pngquant-logo-fs8.png');


exports.pngquantPath = {
    pathtest: function(test) {
        test.expect(1);
        test.ok(pngquantPath != null, 'shouldn\'t be null on mac and windows.');
        test.done();
    },
    exec: function(test) {
        test.expect(1);

        execFile(pngquantPath, ['256', '--', oldPath], function() {
            var oldSize = fs.statSync(oldPath).size,
                newSize = fs.statSync(newPath).size;

            test.ok(newSize < oldSize, 'should be smaller.');

            fs.unlinkSync(newPath);

            test.done();
        });
    }
};
