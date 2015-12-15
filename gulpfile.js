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

/*//TASK to Minify All Images
gulp.task('minimgs', function(){
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('minified'));
});*/

//TASK to Minify All Images
gulp.task('mincss', function(){
    return gulp.src(paths.css)
        .pipe(mincss())
});

/*TASK to Minify All Audio, not sure which gulp plugin to use for this yet
gulp.task('minifyaudio', function(){
    return gulp.src(paths.audio)
        .pipe()
        .pipe(gulp.dest('build/audio'));
});*/

/* START of MOCHA TEST-RELATED
gulp.task('mocha', function(){
    return gulp.src(['src/*.js'], {read: false})
        .pipe(mocha({reporter: 'list'}))
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function(){
    gulp.watch('src/**', ['mocha']);
});
END OF MOCHA TEST-RELATED
*/

//Removed ImageMin from default task, will compress elsewhere
gulp.task('default', ['watch', 'scripts']);