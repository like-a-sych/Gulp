var { src, dest, watch, parallel, series } = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify-es').default;
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var del = require('del');
var webp = require('gulp-webp')
const fileInclude = require('gulp-file-include');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');

let isProd = false; // dev by default

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
		reloadDelay: 500
	})
}

function cleanDist() {
	return del('dist')
}

function cleanCache() {
	return del(['dist/js'], ['dist/css'], ['dist/fonts'], ['dist/index.html'])
}

function images() {
	return src('app/_img/**/*')
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest('dist/img'))
}

function webpconvert() {
	return src(['app/_img/**/*', '!app/_img/**/*.webp'])
		.pipe(webp())
		.pipe(dest('dist/img'))
}



function images_bufer() {
	return src('app/_img/_bufer/*')
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest('dist/img/bufer'))
}
function webpconvert_bufer() {
	return src(['app/_img/_bufer/*', '!app/_img/**/*.webp'])
		.pipe(webp())
		.pipe(dest('dist/img/bufer'))
}

const htmlInclude = () => {
	return src(['app/*.html'])
		.pipe(fileInclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(dest('dist'))
		.pipe(browserSync.stream());
}

const scripts = () => {
	src('app/_js/modules/**.js')
		.pipe(concat('modules.min.js'))
		.pipe(uglify())
		.pipe(dest('dist/js/'))
	return src(
		['app/_js/global.js', '.app/_js/components/**.js', 'app/_js/main.js'])
		.pipe(gulpif(!isProd, sourcemaps.init()))
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(gulpif(!isProd, sourcemaps.write('.')))
		.pipe(dest('dist/js'))
		.pipe(browserSync.stream());
}

const styles = () => {
	return src('app/_scss/**/*.scss')
		.pipe(gulpif(!isProd, sourcemaps.init()))
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe(gulpif(!isProd, sourcemaps.write('.')))
		.pipe(dest('dist/css'))
		.pipe(browserSync.stream());
};

const styleslight = () => {
	return src('app/_scss/style.scss')
		.pipe(gulpif(!isProd, sourcemaps.init()))
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe(gulpif(!isProd, sourcemaps.write('.')))
		.pipe(dest('dist/css'))
		.pipe(browserSync.stream());
};

function build() {
	return src([
		'app/_fonts/**/*',
	], { base: 'app' })
		.pipe(dest('dist'))
}

function watching() {
	watch(['app/_scss/**/*.scss'], styleslight);
	watch(['app/_js/**/*.js', '!app/_js/main.min.js'], scripts);
	watch(['app/*.html']).on('change', browserSync.reload);
	watch('app/_img/_bufer/*.{jpg,jpeg,png,svg}', series(webpconvert_bufer, images_bufer));
	watch(['app/**/*.html'], htmlInclude);
	watch(['app/*.html'], htmlInclude);
}

exports.html = htmlInclude;
exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.webpconvert = webpconvert;

exports.build = series(cleanDist, webpconvert, images, styles, scripts, htmlInclude, build);
exports.cache = series(cleanCache, styles, scripts, build);
exports.default = parallel(htmlInclude, styles, scripts, browsersync, watching);