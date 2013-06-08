


module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
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
                'app/**/*.js'
            ]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('jshint', [
        'jshint',
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

};