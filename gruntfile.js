var grunt = require('grunt');
var grutil = require('grunt-util');
var bower = require('bower');
var concat = require('grunt-concat');
var sass = require('grunt-sass');
//var minifyCss = require('grunt-minify-css');
var rename = require('grunt-rename');
var sh = require('shelljs');

var paths = {
    sass: ['./Ionic_Files/scss/**/*.scss']
};

module.exports = function(grunt){
//module.exports is a "wrapper" func, and must ALWAYS be used for gruntfiles    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            //files to concatenate    
        },
        uglify: {
            options: {
                
            },
            build: {
                src: './**/*.js', //files to uglify
                dest: 'build/<%= pkg.name %>.min.js' //output file after uglification
            }
        }
    })
    
    //Start of Tasks to Load (concatenation, minification, linting etc.)
    grunt.loadNpmTasks([
        'grunt-contrib-uglify', //minification
        'grunt-contrib-concat', //concatenation
        'grunt-contrib-jshint' //linting
    ]);
    grunt.registerTask('sass', function(done){
        grunt.src('./Ionic_Files/scss/ionic.app.scss')
            .pipe(sass())
            .on('error', sass.logError)
            .pipe(grunt.dest('./Ionic_Files/www/css/'))
            .pipe(minifyCss({ //minifyCss might cause issues
              keepSpecialComments: 0
            }))
            .pipe(rename({ extname: '.min.css' }))
            .pipe(grunt.dest('./Ionic_Files/www/css/'))
            .on('end', done);
    })
    //Names default grunt tasks to run
    grunt.registerTask('default', ['sass', 'concat','uglify']);
    
};