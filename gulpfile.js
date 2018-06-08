const gulp = require('gulp'),
    // connect = require('gulp-connect'),
    ts = require("gulp-typescript"),
    tsProject = ts.createProject("tsconfig.json"),
    browserify = require("browserify"),
    source = require('vinyl-source-stream'),
    watchify = require("watchify"),
    tsify = require("tsify"),
    gutil = require("gulp-util"),
    replace = require("gulp-string-replace"),
    browserSync = require('browser-sync'),
    // Fontmin = require('fontmin'),
    rename = require('gulp-rename')
shell = require('gulp-shell'),
    babelify = require('babelify');
// babel = require('gulp-babel');
var md5 = require("gulp-md5-plus");
const srcPath = {
    page: 'src/index.html',
    css: 'src/css/*.css',
    lib: 'src/lib/*',
    ts: 'src/*.ts',
    assets: ['src/assets/*.png', 'src/assets/*.jpg'],
    text_font: 'src/css/text_font.ttf',
};

const distPath = {
    page: 'dist',
    css: 'dist/css',
    lib: 'dist/lib',
    ts: 'dist',
    assets: 'dist/assets',
    font: 'dist/css',
};

const fileName = {
    bundle: 'bundle.js',
    textFontCSS: 'text_font.css'
};

var tsWatchedBrowserify = watchify(
    browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .transform(babelify, {
        presets: [
            'es2015', //转换es6代码
            'stage-0', //指定转换es7代码的语法提案阶段
        ],
        plugins: [
            'transform-object-assign', //转换es6 Object.assign插件
        ]
    })
    .plugin(tsify)
);

function bundle() {
    console.log('start bundle...');
    return tsWatchedBrowserify
        .bundle()
        .pipe(source(fileName.bundle))
        .pipe(gulp.dest(distPath.ts));
}


function md5Hash() {
    return gulp.src(['dist/bundle.js', 'dist/**/*.css'])
        .pipe(md5(10, 'dist/index.html'))
        .pipe(gulp.dest('dist'));
}

gulp.task('md5Hash', md5Hash);

function copyHTML() {
    return gulp.src(srcPath.page)
        .pipe(replace('main.ts', fileName.bundle))
        // .pipe(replace('<!-- fonts css -->', '<link type="text/css" rel="stylesheet" href="/css/'+fileName.textFontCSS+'"/>'))
        .pipe(gulp.dest(distPath.page));
}

function copyCSS() {
    return gulp.src(srcPath.css)
        // .pipe(md5(10, 'src/index.html'))
        .pipe(gulp.dest(distPath.css));
}

function copyAssets() {
    return gulp.src(srcPath.assets)
        .pipe(gulp.dest(distPath.assets));
}

function copyLib() {
    return gulp.src(srcPath.lib)
        .pipe(gulp.dest(distPath.lib));
}

function startServer() {
    console.log('start server...');
    var bs = browserSync.create('myServer')
        .init({
            server: 'dist',
            port: 2400,
            livereload: true,
        });

    bs = browserSync.get('myServer');

    bs.watch([
        './dist/*.html',
        './dist/*.js',
        './dist/css/*.css',
        './dist/lib/*.js',
        './dist/assets/*.png',
        './dest/assets/*.ttf',
    ]).on('change', function (event) {
        console.log(event + ' was changed and browser will be reload.');
        bs.reload();
    });
}

gulp.task('copyLib', copyLib);

gulp.task('copyHTML', copyHTML);

gulp.task('copyCSS', copyCSS);

gulp.task('copyAssets', copyAssets);

gulp.task('bundle', bundle);

gulp.task('watch', function () {
    gulp.watch(srcPath.page).on('change', copyHTML);
    gulp.watch(srcPath.css).on('change', copyCSS);
    gulp.watch(srcPath.lib).on('change', copyLib);
    gulp.watch(srcPath.assets).on('change', copyAssets);
    tsWatchedBrowserify.on("update", bundle);
});


gulp.task('debug', ['copyLib', 'copyCSS', 'copyAssets', 'copyHTML', 'bundle', 'watch'], startServer);
gulp.task('build', ['copyLib', 'copyCSS', 'copyAssets', 'copyHTML', 'bundle'], function () {
    gulp.start('md5Hash');
});