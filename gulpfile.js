var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sass_sourcemaps = require('gulp-sourcemaps');
var browserSync = require("browser-sync");

var config = {
	"paths": {
		"global": "./Styles/global/",
		"base": "./Styles/base.scss",
		"dest": "./Styles/css",
		"themes": "./Styles/css/themes"
	},
	"watchers": {
		"global": "./Styles/**/*.scss",
		"base": "./Styles/base.scss",
		"themes": "./Styles/themes/**/*.scss",
		"baseCss": "./Styles/css/base.css",
	}
}

gulp.task('start', ['scss:watch'], function() {
	browserSync.init({
        logPrefix: 'Epinova Gulp',
        host: 'localhost',
        port: 3000	,
        open: false,
        notify: false,
        ghost: false
    });

	browserSync.watch("./Styles/css/**/*.css", function (event, file) {
        console.log('Event: ' + event);
        if (event === "change") {
            browserSync.reload();
        }
    });
});

gulp.task('scss:watch', function () {
    gulp.watch(config.watchers.global, ['scss:css']);
    gulp.watch(config.watchers.base, ['scss:css']);
    gulp.watch(config.watchers.baseCss, ['autoprefixer:dev']);
    gulp.watch(config.watchers.themes, ['scss:theme:css']);
});

gulp.task('scss:theme:css', function() {
	console.log("merging themes");
	return gulp.src(config.watchers.themes)
		.pipe(sass_sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sass_sourcemaps.write())
		.pipe(gulp.dest(config.paths.themes));
});

gulp.task('scss:css', function() {
    console.log("Merging scss to css");
    return gulp.src(config.watchers.base)
     .pipe(sass_sourcemaps.init())
     .pipe(sass().on('error', sass.logError))
     .pipe(sass_sourcemaps.write())	
     .pipe(gulp.dest(config.paths.dest));
});

gulp.task('autoprefixer:dev', function () {
    console.log("autoprefixer:dev");
    return gulp.src(config.paths.dest)
	.pipe(autoprefixer({
	    browsers: ['last 4 versions'],
	    cascade: true
	}))
	.pipe(gulp.dest(config.paths.dest));
});