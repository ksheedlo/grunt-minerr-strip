'use strict';

var esprima = require('esprima'),
  escodegen = require('escodegen'),
  grunt = require('grunt'),
  stripper = require('./strip.js'),
  minSource =
    'function minErr(module) {' +
    '  var stringify = function (arg) {\n' +
    '    if (typeof arg == "function") {\n' +
    '      return arg.toString().replace(/ \\{[\\s\\S]*$/, \'\');\n' +
    '    } else if (typeof arg == "undefined") {\n' +
    '      return "undefined";\n' +
    '    } else if (!(typeof arg == "string")) {\n' +
    '      return JSON.stringify(arg);\n' +
    '    }\n' +
    '    return arg; };\n' +
    '  return function () {\n' +
    '    var code = arguments[0],\n' +
    '      prefix = "[" + (module ? module + ":" : "") + code + "] ",\n' +
    '      message,\n' +
    '      i = 1;\n' +
    '    message = prefix + \'\"MINERR_URL\"\' + code;\n' +
    '    for(; i < arguments.length; i++) {\n' +
    '      message = message + (i == 1 ? "?" : "&") + "p" + (i-1) + "=" + stringify(arguments[i]);\n' +
    '    }\n' +
    '    return new Error(message); }; }';

module.exports = {
  stripErrors: function (target, id, version, config) {
    var errorConfig = { id: id, version: version },
      extractedErrors = {},
      productionSource = minSource.replace(/"MINERR_URL"/g, config.url),
      ast,
      resultSource,
      strip,
      strippedAST,
      subAST;

    subAST = esprima.parse(productionSource).body[0];
    strip = stripper({ logger: grunt.log, minErrAst: subAST });
    
    for (var prop in config.files) {
      if (config.files.hasOwnProperty(prop)) {
        ast = esprima.parse(grunt.file.read(config.files[prop]), {loc: true});
        strippedAST = strip(ast, extractedErrors, config.files[prop]);
        resultSource = escodegen.generate(strippedAST, {
            format: {
              indent: {
                style: '  ',
                base: 0
              }
            }
          });
        grunt.file.write(prop, resultSource);
      }
    }
    errorConfig.version = version;
    errorConfig.generated = new Date().toString();
    errorConfig.errors = extractedErrors;
    grunt.file.write(target, JSON.stringify(errorConfig));
  }
};
