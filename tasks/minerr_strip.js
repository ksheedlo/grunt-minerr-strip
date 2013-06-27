/*
 * grunt-minerr-strip
 * https://github.com/ksheedlo/grunt-minerr-strip
 *
 * Copyright (c) 2013 Ken Sheedlo
 * Licensed under the MIT license.
 */

'use strict';

var utils = require('../lib/utils.js');

module.exports = function(grunt) {

  grunt.registerMultiTask('minerr_strip', 'Strips minErr error messages from your build.', function() {
    utils.stripErrors(this.target, grunt.version, this.data); 
  });
};
