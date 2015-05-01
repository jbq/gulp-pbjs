var through = require('through2');
var gutil = require('gulp-util');
var fs = require("fs");
var extend = require('extend');

const PLUGIN_NAME = 'gulp-pbjs';

var sources = {};
fs.readdirSync(__dirname+"/node_modules/protobufjs/cli/pbjs/sources").forEach(function(source) {
    if (/\.js$/.test(source))
        sources[source.substring(0, source.lastIndexOf("."))] = require(__dirname+"/node_modules/protobufjs/cli/pbjs/sources/"+source);
});

var targets = {};
fs.readdirSync(__dirname+"/node_modules/protobufjs/cli/pbjs/targets").forEach(function(target) {
    if (/\.js$/.test(target))
        targets[target.substring(0, target.lastIndexOf("."))] = require(__dirname+"/node_modules/protobufjs/cli/pbjs/targets/"+target);
});


function pbjs(o) {

    var options = extend({
        source: "proto",
        target: "commonjs",
        path: []
    }, o);

    return through.obj(function(file, enc, cb) {
        console.log(file.base);

        if (file.isNull()) {
            cb(null, file);
        }
        //if (file.isStream()) {
        //    file.contents = file.contents.pipe(through());
        //}

        if(file.isBuffer()) {

            var callOptions = extend({}, options, {path:[file.base]});

            var builder = sources[options.source](file.history[0], callOptions);
            file.contents = new Buffer(targets[options.target](builder, callOptions));

            file.path = gutil.replaceExtension(file.path, ".js");
        }

        cb(null, file);

    });

};

module.exports = pbjs;