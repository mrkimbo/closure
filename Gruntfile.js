module.exports = function(grunt) {

  var compiler = require('superstartup-closure-compiler');

  var CONFIG = {
      src: 			'src',
      deploy: 		'deploy',
      app: 			'src/js/app/',
      appJS:		'main.js',
      appEntryPoint:'Main',
      externs: 		'build/externs/',
      closureLibrary: 'src/js/lib/closure-library',
      output:		'deploy/js/main.js',
      sourceMap: 	'deploy/js/sourcemap.js.map',
      
      // This sting will wrap your code marked as %output%
      // Take care to edit the sourcemap path
      outputWrapper: '(function(){%output%}).call(this);' +
      '//@sourceMappingURL=app/jsc/sourcemap.js.map'
  };

  // Project configuration.
  grunt.initConfig({

    // Clean deploy folder //
    clean: {
       dist:{
          files: [{
            dot: true,
            src: [
              '.tmp',
              CONFIG.deploy + '*//*',
              CONFIG.deploy + '/.git*'
            ]
          }]
        }
    },

    // Copy jsLibs, images and css to deploy //
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: CONFIG.src,
          dest: CONFIG.deploy,
          src: [
              'js/lib/jquery-1.7.2.min.js',
              'img/**/*',
              'index.html'
          ]
        }]
      },
      // Copy un-minified scripts to deploy //
      dev: {
        files: [{
          expand: true,
          dot: true,
          cwd: CONFIG.src,
          dest: CONFIG.deploy,
          src: [
            'js/**/*',
            'img/**/*',
            'css/**/*',
            'index.html'
          ]
        }]
      }
    },

    // Prepend versioning identifiers onto filenames //
    rev: {
      dist: {
        files: {
          src: [
            CONFIG.deploy + '/js/{,*/}*.js',
            CONFIG.deploy + '/css/{,*/}*.css',
            CONFIG.deploy + '/img/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      }
    },

    // Replace script/css paths with minified names //
    useminPrepare: {
      html: CONFIG.src + '/index.html',
      options: {
         dest: CONFIG.deploy
      }
    },
    usemin: {
      html: [CONFIG.deploy + '/{,*/}*.html'],
        css: [CONFIG.deploy + '/css/{,*/}*.css'],
        options: {
          dirs: [CONFIG.deploy]
        }
    },

    // Concat and minify css //
    cssmin: {
      dist: {
        files: {
          'deploy/css/main.css': [
            /*CONFIG.src + '/css/{,*//*}*.css'*/

            // maintain css order //
            CONFIG.src + '/css/reset.css',
            CONFIG.src + '/css/fonts.css',
            CONFIG.src + '/css/colorpicker-simplegrid.css',
            CONFIG.src + '/css/styles.css'
          ]
        }
      }
    },

	// Closure Tools Tasks
    // Dependency & Compiling
    //
    closureDepsWriter: {
      options: {
        closureLibraryPath: CONFIG.closureLibrary
      },
      app: {
        options: {
          root_with_prefix: [
          '"' + CONFIG.app + ' ../../../js"',
          ]
        },
        dest: '' + CONFIG.app + '/deps.js'
      }
    },
    closureBuilder: {
      options: {
        closureLibraryPath: CONFIG.closureLibrary,
        inputs: [CONFIG.app + CONFIG.appJS],
        compile: true,
        compilerFile: compiler.getPathSS(),
        compilerOpts: {
          //compilation_level: 'SIMPLE_OPTIMIZATIONS',
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          externs: [CONFIG.externs + '*.js'],
          define: [
            '\'goog.DEBUG=false\''
          ],
          warning_level: 'verbose',
          jscomp_off: ['checkTypes', 'fileoverviewTags'],
          summary_detail_level: 3,
          only_closure_dependencies: null,
          closure_entry_point: CONFIG.appEntryPoint,
          create_source_map: CONFIG.sourceMap,
          source_map_format: 'V3',
          output_wrapper: CONFIG.outputWrapper
        }
      },
      
      // DEBUG CONFIG //
      debug: {
        options: {
          compilerFile: compiler.getPath()
        },
        src: [
          CONFIG.app,
          CONFIG.closureLibrary
        ],
        dest: CONFIG.output
      },
      
      // RELEASE CONFIG //
      release: {
        src: [
          CONFIG.app,
          CONFIG.closureLibrary
        ],
        dest: CONFIG.output
      }
    },
	
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('default', [
    'clean',
    'useminPrepare',
	'cssmin',
    'copy:dist',
    'closureBuilder:release',
    'rev',
    'usemin'
  ]);
};