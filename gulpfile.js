/**
 * 初始化
 * npm install gulp-util gulp-imagemin gulp-sass gulp-minify-css gulp-uglify gulp-rename gulp-concat gulp-clean gulp-clean tiny-lr --save-dev
 */

// 引入 gulp及组件
var gulp = require('gulp'); //基础库
var imagemin = require('gulp-imagemin'); //图片压缩
var sass = require('gulp-sass'); //sass
var minifycss = require('gulp-minify-css'); //css压缩
var jshint = require('gulp-jshint'); //js检查
var uglify = require('gulp-uglify'); //js压缩
var rename = require('gulp-rename'); //重命名
var concat = require('gulp-concat'); //合并文件
var clean = require('gulp-clean'); //清空文件夹
var cached = require('gulp-cached'); //缓存原始文件，每次只编译修改过的文件
var browserSync = require('browser-sync'); // 浏览器同步
var reload = browserSync.reload; // 自动刷新


// HTML处理
gulp.task('html', function() {
    var htmlSrc = ['./src/**/*.html', './src/**/*.json'];
    var htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDst))
        .pipe(reload({
            stream: true
        }));
});

// 样式处理
gulp.task('css', function() {
    var cssSrc = './src/**/*.css';
    var cssDst = './dist/css';

    gulp.src(cssSrc)
        .pipe(minifycss())
        .pipe(gulp.dest(cssDst))
        .pipe(reload({
            stream: true
        }));
});

// 图片处理
gulp.task('images', function() {
    var imgSrc = './src/images/**/*';
    var imgDst = './dist/images/';
    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst))
        .pipe(reload({
            stream: true
        }));
})

// js处理
gulp.task('js', function() {

    var libSrc = './src/js/**/*.js';
    var libDst = './dist/js/';

    gulp.src(libSrc)
        .pipe(uglify())
        // .pipe(concat("vendor.js"))
        .pipe(gulp.dest(libDst))
        .pipe(reload({
            stream: true
        }));
});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./dist/css', './dist/js', './dist/images'], {
            read: false
        })
        .pipe(clean());
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function() {
    gulp.start('html', 'css', 'images', 'js');
});

// 定义web服务模块，增加浏览器同步浏览
gulp.task('serve-sync', function() {
    browserSync({
        server: {
            baseDir: './dist'
        }
    });
});

// gulp.task('react', function() {
//     return gulp.src('/src/js/**/*.jsx')
//         .pipe(react())
//         .pipe(gulp.dest('/src/js/**/*.js'))
// });

// 监听任务 运行语句 gulp watch
gulp.task('watch', function() {
    // livereload.listen(); 
    gulp.run('serve-sync');
    htmlSrc = ['./src/**/*.html', './src/**/*.json']
    gulp.watch(htmlSrc, function(event) {
        gulp.run('html');
    })

    // 监听css
    gulp.watch('./src/scss/**/*.css', function() {
        gulp.run('css');
    });

    // 监听images
    gulp.watch('./src/images/**/*', function() {
        gulp.run('images');
    });

    // 监听js
    gulp.watch(['./src/js/**/*.js'], function() {
        gulp.run('js');
    });
});