var gulp = require('gulp');

var jshint   = require('gulp-jshint');
var less     = require('gulp-less');
var electron = require('gulp-electron');
var install  = require('gulp-install');
var react    = require('gulp-react');
var path     = require('path');
var runElectron = require('gulp-run-electron');

gulp.task('package', ['compile', 'install'], function() {
	return gulp.src('')
			.pipe(electron({
				src: './dest',
				packageJson: require('./dest/package.json'),
				release: './release',
				cache:   './cache',
				version: 'v1.2.0',
				packaging: true,
				platforms: ['darwin-x64', 'linux-x64']
			}))
			.pipe(gulp.dest(''));
});

gulp.task('run', ['compile', 'install'], function() {
	return gulp.src('dest')
			.pipe(runElectron([], {}));
});

gulp.task('install', ['compile'], function() {
	return gulp.src('./dest/package.json')
			.pipe(install({production: true}));
});

gulp.task('jshint', function() {
	return gulp.src([
		'!./src/js/components/*.js',
		'!./src/js/app.js',
		'./src/js/**/*.js',
		'main.js'
			])
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
});

gulp.task('less', function() {
	return gulp.src('./src/{player,playlist}/style/style.less')
			.pipe(less({
				paths: [ path.join(__dirname, 'src', 'shared', 'less')]
			}))
			.pipe(gulp.dest('dest/'));
});

gulp.task('scripts', ['jshint'], function() {
	return gulp.src('./src/*/js/**/*.js')
			.pipe(react())
			.on('error', console.log.bind(console))
			.pipe(gulp.dest('dest/'));
});

gulp.task('files', function() {
	return gulp.src([
		'./src/{player,playlist}/index.html',
		'main.js',
		'package.json'
			])
			.pipe(gulp.dest('dest'));
});

gulp.task('imgs', function() {
	return gulp.src('./src/{player,playlist}/img/*.png', {base: './src/{player,playlist}'})
			.pipe(gulp.dest('dest/img/'));
})

gulp.task('compile', ['scripts', 'files', 'imgs', 'less']);

gulp.task('default', ['jshint', 'compile', 'install', 'run']);
