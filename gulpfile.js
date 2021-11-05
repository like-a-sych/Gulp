var { src, dest, watch, parallel, series } = require ('gulp');
var sass = require ('gulp-sass')(require('sass'));
var concat = require ('gulp-concat');
var browserSync = require ('browser-sync').create();
var uglify = require ('gulp-uglify-es').default;
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
    }
  })
}

function cleanDist() {
  return del('dist')
}

function cleanCache() {
  return del(['dist/js'], ['dist/css'], ['dist/fonts'], ['dist/index.html'])
}

function images() {
  return src('app/img/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
    ]))
    .pipe(dest('dist/img'))
}

function webpconvert() {
  return src(['app/img/**/*', '!app/img/**/*.webp'])
  .pipe(webp())
  .pipe(dest('dist/img'))
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
	src('app/js/modules/**.js')
		.pipe(concat('modules.min.js'))
    .pipe(uglify())
		.pipe(dest('dist/js/'))
  return src(
    ['app/js/global.js', '.app/js/components/**.js', 'app/js/main.js'])
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

const styles = () => {
  return src('app/scss/**/*.scss')
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe (sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
};

const styleslight = () => {
  return src('app/scss/style.scss')
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe (sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
};

function build() {
  return src([
    'app/fonts/**/*',
  ], {base: 'app'})
  .pipe(dest('dist'))
}

function watching() {
  watch(['app/scss/**/*.scss'], styleslight);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
	watch('app/img/**/*.{jpg,jpeg,png,svg}', series(webpconvert, images));
  watch(['app/parts/*.html'], htmlInclude);
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

exports.build = series(cleanDist, webpconvert, images, styles, scripts,htmlInclude, build);
exports.cache = series(cleanCache, styles, scripts, build);
exports.default = parallel(htmlInclude, styles, scripts,  browsersync, watching);