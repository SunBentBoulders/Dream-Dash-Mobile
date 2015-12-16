'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cssmin = require('gulp-minify-css');
// var changed = require('gulp-changed');
//var mocha = require('gulp-mocha');

var paths = {
    scripts: ['vendor/**/*.js', 'lib/**/*.js', 'src/**/*.js'],
    images: ['img/**/*', 'assets/images/**/*', 'icons/**/*'],
    audio: 'assets/bgm/**/*',
    css: ['css/**/*.css', 'assets/style/**/*.css']
};

gulp.task('watch', function(){
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.audio, ['audio']);
    gulp.watch(paths.css, ['css']);
});

gulp.task('scripts', function(){
    //output and put script in build folder
    return gulp.src(paths.scripts)
        //concat and uglify scripts
        .pipe(concat('allfiles.js'))
        .pipe(uglify())
        //rename minified file, then place in build folder
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('minified'));
        
});

/*
//TASK to Minify All Images - Currently only reduces size by 1.5MB, using API instead
gulp.task('minimgs', function(){
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 7}))
        .pipe(gulp.dest('minified'));
});
*/

//TASK to Minify All CSS
gulp.task('mincss', function(){
    return gulp.src(paths.css)
        // .pipe(concat('allfiles.css'))
        .pipe(cssmin({compatibility: 'ie8'}))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('minified'))
});

/* START of MOCHA TEST-RELATED
gulp.task('mocha', function(){
    return gulp.src(['src/*.js'], {read: false}) //read option "false" allows files to be piped to mocha first
        .pipe(mocha({reporter: 'nyan'}))
        //reporter option "nyan" is just one of many we can use
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function(){
    gulp.watch('src/**', ['mocha']);
});
END OF MOCHA TEST-RELATED
*/

//Removed ImageMin from default task, will compress elsewhere
gulp.task('default', ['watch', 'scripts', 'mincss']);