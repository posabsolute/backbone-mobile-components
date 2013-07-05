


module.exports = function (grunt) {
    grunt.initConfig({
        less: {
          development: {
            options: {
              paths: ["assets/css"],
              yuicompress: false
            },
            files: {
              'assets/css/boot.css' : "assets/css/boot.less"
            }
          }
        },
        watch: {
            less: {
                files: ['assets/css/*.less','assets/css/**/*.less'],
                tasks: ['less']
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'components/*.js'
            ]
        },
        jasmine: {
            components: {
              src: [
              'assets/js/jquery.min.js',
              'assets/js/underscore.js',
              'assets/js/backbone.js',
              'assets/js/greensock-v12-js/src/minified/TweenLite.min.js',
              'assets/js/greensock-v12-js/src/minified/plugins/CSSPlugin.min.js',
              'components/*js'
              ],
              options: {
                specs: 'tests/spec/*Spec.js',
                keepRunner : true,
                helpers: 'tests/helpers/*.js'
              }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-usemin');


    grunt.registerTask('jshintage', [
        'jshint',
    ]);
     grunt.registerTask('test', [
        'jasmine',
    ]);
    grunt.registerTask('buildcss', [
        'less',
    ]);

    grunt.registerTask('watcher', [
        'watch',
    ]);
    grunt.registerTask('watchcss', [
        'watch:less',
    ]);
    grunt.registerTask('travis', [
        'jshint','jasmine'
    ]);
};