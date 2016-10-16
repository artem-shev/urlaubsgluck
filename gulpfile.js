'use strict';

const gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	concat= require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	babel = require('gulp-babel'),
	spritesmith = require('gulp.spritesmith'),
	clean = require('gulp-clean'),
	inject = require('gulp-inject'),
	wiredep = require('wiredep').stream,
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css'),
	htmlmin = require('gulp-htmlmin'),
	imagemin = require('gulp-imagemin'),
	handlebars = require('gulp-handlebars'),
	wrap = require('gulp-wrap'),
	declare = require('gulp-declare'),
	jshint = require('gulp-jshint'),
	jscs = require('gulp-jscs'),
	stylishJsHint = require('jshint-stylish'),
	stylishJscs = require('gulp-jscs-stylish');

const src = {
	html: 'src/*.html',
	hbsPartials: 'src/templates/**/*.hbs',
	scss: 'src/scss/**/*.scss',
	js: 'src/js/**/*.js',
	img: 'src/img/**/*',
	imgSp: 'src/img/sprites_src/*.png',
	fonts: 'src/fonts/*'
};

const dest = {
	tmp: 'tmp/',
	prod: 'prod/',
	cssTmp: 'tmp/css/',
	jsTmp: 'tmp/js/',
	sprites: 'src/img/sprites/',
	tmpl: 'src/js/'
};

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "portfolio",
			routes: {
				'/bower_components': 'bower_components'
			}
        }
    });
});

gulp.task('inject', () => {
	return gulp.src(src.html)
	    .pipe(wiredep({
			directory: 'bower_components'
		}))
		.pipe(gulp.dest(dest.tmp));

});

gulp.task('htmlWatch', ['inject'], () => {
    browserSync.reload();
});

gulp.task('sprites', function() {
	return gulp.src(src.imgSp)
			.pipe(spritesmith({
			    imgName: 'sprites.png',
			    cssName: 'sprites.scss'
			  }))
			.pipe(gulp.dest(dest.sprites));
});

gulp.task('templates', function(){
	return gulp.src(src.hbsPartials)
		.pipe(handlebars({
			handlebars: require('handlebars')
		}))
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			namespace: 'MyApp.templates',
			noRedeclare: true, // Avoid duplicate declarations 
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest(dest.jsTmp));
});

gulp.task('sass', () => {
	return gulp.src(src.scss)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
            browsers: ['> 1%', 'IE 8'],
            cascade: false
        }))
        .pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest(dest.cssTmp))
		.pipe(browserSync.stream());
});

gulp.task('js', () => {
	return gulp.src(src.js)
		.pipe(babel({
            presets: ['es2015']
        }))
		.pipe(gulp.dest(dest.jsTmp))
		.pipe(browserSync.stream());
});

gulp.task('jsWatch', ['js'], () => {
    browserSync.reload();
});

gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylishJsHint));
});

gulp.task('jscs', () => {
    return gulp.src('src/**/*.js')
        // .pipe(jscs({fix: true}))
        // .pipe(gulp.dest('src/'))
		.pipe(jscs())
		.pipe(stylishJscs());
});

gulp.task('imgTmp', () => {
	return gulp.src(src.img)
		.pipe(imagemin())
		.pipe(gulp.dest(dest.tmp + 'img/'));
});

gulp.task('fontsTmp', () => {
	return gulp.src(src.fonts)
		.pipe(gulp.dest(dest.tmp + 'fonts/'));
});

gulp.task('buildTmp', ['inject', 'js', 'sass', 'imgTmp', 'fontsTmp', 'templates'], () => {});

gulp.task('buildProdHtml', ['buildTmp'], () => {
	return gulp.src('tmp/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest(dest.prod));
});

gulp.task('fontsProd', () => {
	return gulp.src(src.fonts)
		.pipe(gulp.dest(dest.prod + 'fonts/'));
});

gulp.task('imgProd', () => {
	return gulp.src(src.img)
		.pipe(imagemin())
		.pipe(gulp.dest(dest.prod + 'img/'));
});

gulp.task('buildProdCss', ['sass'], () => {
	return gulp.src(dest.cssTmp + '*.css')
		.pipe(gulp.dest(dest.prod + 'css'));
});

gulp.task('buildProd', ['buildProdHtml', 'fontsProd', 'imgProd', 'buildProdCss'], () => {
	return gulp.src('prod/index.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(dest.prod));
});

gulp.task('watch', ['browser-sync', 'buildTmp'], () => {
	gulp.watch(src.html, ['htmlWatch']);
	gulp.watch(src.scss, ['sass'])
	gulp.watch(src.js, ['jsWatch']);
	gulp.watch(src.hbsPartials, ['templates']);
});

gulp.task('deafult', () => {});
