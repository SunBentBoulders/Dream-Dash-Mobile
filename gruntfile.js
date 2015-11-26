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

module.exports = function(grunt) {
    //module.exports is a "wrapper" func, and must ALWAYS be used for gruntfiles    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            //files to concatenate    
        },
        uglify: {
            my_target: {
                files: {
                    'www/dist/dist_js/app.min.js': ['www/dist/dist_js/app.min.js']
                }
            },
            build: {
                src: './**/*.js', //files to uglify
                dest: 'build/<%= pkg.name %>.min.js' //output file after uglification
            }
        },
        karma: {
            unit: {
                options: {
                    files: ['test/**/*.js']
                }
            }
        },
        //compress will create an app.zip to package with minified files to send to PhoneGap Build; debug & release included so minification doesn't happen before building while debugging
        //grunt compress:release --> zips minified files
        //grunt compress:debug --> zips unminified files
        compress: {
            debug: {
                options: {
                    archive: 'app.zip'
                },
                files: [{
                    expand: true,
                    src: ['**/*'],
                    cwd: 'www/'
                }]
            },
            release: {
                options: {
                    archive: 'dist/app.zip'
                },
                files: [{
                    expand: true,
                    src: ['dist_js/app.min.js'],
                    cwd: 'www/dist/'
                }, {
                    expand: true,
                    src: ['dist_js/templates.js'],
                    cwd: 'www/dist/'
                }, {
                    expand: true,
                    src: ['dist_css/*'],
                    cwd: 'www/dist/'
                }, {
                    expand: true,
                    src: ['lib/**'],
                    cwd: 'www/'
                }, {
                    expand: true,
                    src: ['images/**'],
                    cwd: 'www/'
                }, {
                    expand: true,
                    src: ['resources/**'],
                    cwd: 'www/',
                    dot: true
                }, {
                    expand: true,
                    src: ['config.xml'],
                    cwd: 'www/'
                }, {
                    expand: true,
                    src: ['index.html'],
                    cwd: 'www/dist/'
                }]
            }
        }
    })

    //Start of Tasks to Load (concatenation, minification, linting etc.)
    grunt.loadNpmTasks([
        'grunt-contrib-uglify', //minification
        'grunt-contrib-concat', //concatenation
        'grunt-contrib-jshint', //linting
        'grunt-karma' //testing
    ]);
    grunt.registerTask('sass', function(done) {
            grunt.src('./Ionic_Files/scss/ionic.app.scss')
                .pipe(sass())
                .on('error', sass.logError)
                .pipe(grunt.dest('./Ionic_Files/www/css/'))
                .pipe(minifyCss({ //minifyCss might cause issues
                    keepSpecialComments: 0
                }))
                .pipe(rename({
                    extname: '.min.css'
                }))
                .pipe(grunt.dest('./Ionic_Files/www/css/'))
                .on('end', done);
        })
        //Names default grunt tasks to run
    grunt.registerTask('default', ['sass', 'concat', 'uglify']);

    //below tasks should go through all necessary build steps for a debug or release app
    grunt.registerTask('build-app-release', ['uglify', 'compress:release', 'phonegap-build:release']);
    grunt.registerTask('build-app-debug', ['compress:debug', 'phonegap-build:debug']);

    //HELPFUL LINKS BELOW:     
    //http://www.joshmorony.com/how-to-minify-an-ionic-application-for-production/
    //http://www.joshmorony.com/learning-the-ionic-framework-as-a-sencha-touch-developer-part-5/    

};