/*
 * grunt-minerr-strip
 * https://github.com/ksheedlo/grunt-minerr-strip
 *
 * Copyright (c) 2013 Ken Sheedlo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'lib/*.js',
        'spec/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    minerr_strip: {
      'errors.json': {
        files: {
          'fixtures/test1.strip.js': 'fixtures/test1.js',
          'fixtures/test2.strip.js': 'fixtures/test2.js'
        },
        url: 'http://docs.example.com/minerr/'
      }
    },

    // Unit tests.
    'jasmine-node': {
      run: {
        spec: 'spec'
      },
      executable: './node_modules/.bin/jasmine-node'
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jasmine-node');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'minerr_strip', 'jasmine-node']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
