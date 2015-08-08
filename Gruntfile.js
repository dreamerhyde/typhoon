/**
 * Gruntfile
 * @author dreamerhyde
 */

module.exports = function(grunt) {
  /**
   * Configuration
   */
  grunt.initConfig({
    /**
     * jshint
     */
    jshint: {
      files: ['Gruntfile.js', 'assets/js/main.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    /**
     * Compass
     */
    compass: {
      dev: {
        options: {
          sassDir: 'assets/stylesheets/sass',
          cssDir: 'assets/stylesheets/css',
          imagesPath: 'assets/stylesheets/images',
          noLineComments: false,
          outputStyle: 'expanded'
        }
      },
      dist: {
        options: {
          sassDir: 'assets/stylesheets/scss',
          cssDir: 'assets/stylesheets/css',
          imagesPath: 'assets/stylesheets/images',
          noLineComments: true,
          outputStyle: 'compressed'
        }
      }
    },
    uglify: {
      options: {
        compress: true,
        mangle: true
      },
      my_target: {
        files: {
          'assets/js/min/main.min.js': [
            'assets/js/ga.js',
            'assets/js/main.js'
          ]
        }
      }
    },
    /**
     * Watch files
     */
    watch: {
      options: {
        livereload: true
      },
      files: ['Gruntfile.js', 'index.html', 'assets/js/main.js', 'assets/stylesheets/sass/*.scss'],
      tasks: ['compass:dev']
    },
    connect: {
      server: {
        options: {
          port: 8000,
          livereload: true,
          keepalive: true,
          open: {
            target: 'http://127.0.0.1:8000', // target url to open
            appName: 'open', // name of the app that opens, ie: open, start, xdg-open
            callback: function() {} // called when the app has opened
          }
        }
      }
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default Task
  grunt.registerTask('default', ['jshint', 'compass:dev', 'connect:server']);
};
