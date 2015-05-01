# gulp-pbjs

A gulp plugin that converts between .proto and JSON syntax / to generate classes.

This is a thin wrapper around the [pbjs tool](https://github.com/dcodeIO/ProtoBuf.js/wiki/pbjs) from the
[protobufjs](https://github.com/dcodeIO/ProtoBuf.js) node module.

## Options object

### source: FORMAT

Specifies the source format. Valid formats are:
- json: Plain JSON descriptor
- proto: Plain .proto descriptor

### target: FORMAT
Specifies the target format. Valid formats are:
- amd: Runtime structures as an AMD module
- commonjs: Runtime structures as a CommonJS module
- js: Runtime structures
- json: Plain JSON descriptor
- proto: Plain .proto descriptor

If omitted, target format defaults to json.


### path: DIR
Adds a directory to the include path. The directory containing the source file will always be searched for imports.

### legacy: true
Includes legacy descriptors from google/protobuf/ if explicitly referenced.

### quiet: true
Suppresses any informatory output to stderr.

### Other Potentially useful options
````
  -using:NAME[=VALUE]     Specifies an option to apply to the volatile builder
                          loading the source file, e.g. convertFieldsToCamelCase.

  -min                    Minifies the output.

Specific to classes:

  -use:NAME[=VALUE]       Specifies an option to apply to the emitted builder
                          utilized by your program, e.g. populateAccessors

  -exports=FQN            Specifies the namespace to export. Defaults to export
                          the root namespace.

  -dependency=ProtoBuf    Library dependency to use when generating classes.
                          Defaults to 'protobufjs' for CommonJS, 'ProtoBuf' for
                          AMD modules and 'dcodeIO.ProtoBuf' for classes.
````