var through = require('through2');
var gutil = require('gulp-util');
var fs = require("fs");
var extend = require('extend');

const PLUGIN_NAME = 'gulp-pbjs';

var sources = {
    json: require('protobufjs/cli/pbjs/sources/json'),
    proto: require('protobufjs/cli/pbjs/sources/proto')
};

var targets = {
    amd: require('protobufjs/cli/pbjs/targets/amd'),
    commonjs: require('protobufjs/cli/pbjs/targets/commonjs'),
    js: require('protobufjs/cli/pbjs/targets/js'),
    json: require('protobufjs/cli/pbjs/targets/json'),
    proto: require('protobufjs/cli/pbjs/targets/proto')
};

function pbjs(o) {

    var options = extend({
        source: "proto",
        target: "commonjs",
        path: []
    }, o);

    return through.obj(function(file, enc, cb) {

        if (file.isNull()) {
            cb(null, file);
        }
        //if (file.isStream()) {
        //    file.contents = file.contents.pipe(through());
        //}

        if(file.isBuffer()) {

            var callOptions = extend({}, options)
            callOptions.path.push(file.base)

            var builder = sources[options.source]([file.history[0]], callOptions);
            file.contents = new Buffer(targets[options.target](builder, callOptions));

            file.path = gutil.replaceExtension(file.path, ".js");
        }

        cb(null, file);

    });

};

module.exports = pbjs;
