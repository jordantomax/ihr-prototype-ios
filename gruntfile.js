var coffeePath = 'compile/coffee/';

module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        compass: {
          dev: {
            options: {
              sassDir: 'compile/scss',
              cssDir: 'assets/stylesheets/',
              imagesDir: 'compile/img',
              generatedImagesDir: 'assets/img',
              importPath: ['compile/scss/common', 'compile/scss/modules'],
              relativeAssets: true
            }
          }
        },

        handlebars: {
          compile: {
            options: {
              namespace: "Handlebars.templates",
              processName: function(filepath) {
                var filename = (filepath).replace('compile/templates/','');
                var name     = (filename).replace('.hb','');
                return name;
              }
            },
            files: {
              "compile/js/templates.js": "compile/templates/*.hb"
            }
          }
        },

        coffee: {
          compile: {
            files: {
              'compile/js/site.js': [
                coffeePath + 'app.coffee',
                coffeePath + 'jqueryBase.coffee',
                coffeePath + 'jqueryPlugin.coffee',
                coffeePath + 'data.coffee',
                coffeePath + 'header.coffee',
                coffeePath + 'genre.coffee',
                coffeePath + 'station.coffee',
                coffeePath + 'router.coffee',
                coffeePath + 'init.coffee'
              ]
            }
          }
        },

        watch: {
          sass: {
            files: [
              'compile/scss/**/*.scss'
            ],
            tasks: ['compass']
          },

          coffee: {
            files: [
              'compile/coffee/**/*.coffee'
            ],
            tasks: ['coffee']
          },

          triggerLiveReloadOnTheseFiles: {
            options: {
              livereload: true
            },
            files: [
              '*.html',
            ],
            tasks: ['default']
          },

          handlebars: {
            files: [
              'compile/templates/*.hb'
            ],
            tasks: ['handlebars']
          },

          js: {
            files: [
              'compile/js/**/*.js',
            ],
            tasks: ['min']
          }
        },

        concat: {
          options: {
            separator: ';',
            stripBanners: true
          },

          dist: {
            src: [
              'compile/js/libs/jquery-2.0.3.js',
              'compile/js/libs/underscore.js',
              'compile/js/libs/backbone.js',
              'compile/js/libs/handlebars-runtime.js',

              'compile/js/templates.js',
              'compile/js/site.js'
            ]
            , dest: 'assets/js/all.js'
          }
        }

        // uglify: {
        //   my_target: {
        //     files: {
        //       'assets/js/all-min.js': ['compile/js/all.js']
        //     }
        //   }
        // }
    });

    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-coffee');

    grunt.registerTask('default', [
        'compass',
        'handlebars'
    ]);

    grunt.registerTask('prod', [

    ]);

    grunt.registerTask('min', [
        'concat'
        // 'uglify'
    ]);
};
