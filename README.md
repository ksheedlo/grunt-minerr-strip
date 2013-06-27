# grunt-minerr-strip

> Strips minErr error messages from your build.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-minerr-strip --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-minerr-strip');
```

## The "minerr_strip" task

### Overview
In your project's Gruntfile, add a section named `minerr_strip` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  minerr_strip: {
    'errors.json': {
      files: {
        'foo.strip.js': 'foo.js',
        'bar.strip.js': 'bar.js',
        'baz.strip.js': 'baz.js'
      },
      url: 'http://example.com/minerr/'
    }
  },
})
```

This example strips `minErr` errors from the files `foo.js`, `bar.js` and `baz.js`, producing `foo.strip.js`, `bar.strip.js` and `baz.strip.js` respectively. URLs logged to the command line will start with `http://example.com/minerr/`.

### Usage Examples

#### Options

Each target produces a JSON file of the same name containing errors and metadata. It can be configured with the following options:

##### files

Type: `object` Default value: `{}`

Each entry is a `string` mapping to `string`. The object maps stripped file names to the dependent file to strip.

##### url

Type: `string` Default value: ''

This url will be substituted in the production minErr implementation which is in turn substituted for minErr definitions in user code.

## Contributing
Pull requests are welcome! Remember to keep the following rules in mind:
- All features or bug fixes must be documented by one or more specs. We use [Jasmine](http://pivotal.github.io/jasmine).
- Submissions must pass JSHint. Run `grunt jshint` to check this.
- Instead of complex inheritance hierarchies, we prefer simple objects. We use prototypical inheritance only when absolutely necessary.
- We love functions and closures and, whenever possible, prefer them over objects.


## Release History
- 2013-06-26 v0.1.0 Initial release
