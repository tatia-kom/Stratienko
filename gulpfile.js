const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const minifycss = require('gulp-minify-css');
const rename = require("gulp-rename");
const autoprefix = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const config = {

   	server: {

       baseDir: "./build"

   	},

   	tunnel: false,

   	host: 'localhost',

   	port: 8080

};

function htmlBuild() {

	/*return gulp.src('src/*.html')

           .pipe(gulp.dest('build/'));*/

	return gulp.src('src/html/pages/*.pug')
		.pipe(pug({pretty: true}))
		.pipe(gulp.dest('build/'));

}

function fontsBuild() {
	return gulp.src('src/fonts/*')

           .pipe(gulp.dest('build/fonts/'));
}

function jsBuild() {
    return gulp.src('src/js/*')

        .pipe(gulp.dest('build/js/'));
}

function imgBuild() {
	return gulp.src('src/img/*')

		   .pipe(imagemin([
               imagemin.mozjpeg({quality: 90, progressive: true})
		   ]))

           .pipe(gulp.dest('build/img/'));
}

gulp.task('css', function() {

    return gulp.src('src/scss/*.scss')

        .pipe(sourcemaps.init())

       .pipe(sass().on('error', sass.logError))

       .pipe(autoprefix({

         cascade: false

       }))

       .pipe(minifycss())

		.pipe(sourcemaps.write())

       .pipe(rename({suffix: '.min'}))

       .pipe(gulp.dest('build/css/'))

       .pipe(browserSync.stream());

});

gulp.task('clearBuild', function() {

	return del(['build/*'])

});

gulp.task('watch', function() {

	browserSync.init(config);

	gulp.watch('src/scss/**/*.scss', gulp.series('css'));

	gulp.watch('src/scss/*.scss', gulp.series('css'));

    gulp.watch('src/js/*.js', gulp.series(jsBuild));

    gulp.watch('src/html/components/*.pug',  gulp.parallel(htmlBuild, imgBuild)).on('change', browserSync.reload);

	gulp.watch('src/html/pages/*.pug',  gulp.parallel(htmlBuild, imgBuild)).on('change', browserSync.reload);

});

gulp.task('build', 

	gulp.series(
		'clearBuild',
		gulp.parallel(htmlBuild, jsBuild, fontsBuild, imgBuild, 'css')
	)

);

gulp.task('default', gulp.series('build', 'watch'));