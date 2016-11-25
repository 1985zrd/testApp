'use strict';
// var gulp = require('gulp'),
//     rev = require('gulp-rev'),      // 文件加版本号
//     revReplace = require('gulp-rev-replace'),   // 替换加了版本号的引用
//     useref = require('gulp-useref'),     // 提取html里加注释的部分
//     filter = require('gulp-filter'),     // 文件过滤
//     uglify = require('gulp-uglify'),     // js压缩
//     csso = require('gulp-csso'),         // css压缩
//     //seajscombine = require("gulp-seajs-combine"),      //合并使用sea.js写的js
//     //htmlmin = require('gulp-htmlmin'),     // 压缩html
//     sass = require('gulp-sass'),        // sass转css
//     jshint = require('jshint'),        // js检测
//     imagemin = require('gulp-imagemin'),    // 图片压缩
//     base64 = require('gulp-base64');        // css里的图片转成base64
// //var minifycss = require('gulp-minify-css');        // 压缩CSS

// var path = {
//     // 开发环境
//     dev: {
//         html: './public',
//         js: './public/js',
//         sass: './public/sass',
//         css: './public/css',
//         img: './public/img' 
//     },
//     // 发布环境
//     dist: {
//         html: './dist',
//         js: './dist/js',
//         css: './dist/css',
//         img: './dist/img' 
//     }
// };

// // gulp.task('lint', function() {
// //     return gulp.src(path.dev.js+'/**/*.js')
// //         .pipe(jshint())
// //         .pipe(jshint.reporter('default'));
// // });

// // gulp.task('page', function () {
// //     var jsFilter = filter('**/*.js', {restore: true});
// //     var cssFilter = filter('**/*.css', {restore: true});
// //     var indexHtmlFilter = filter(['**/*', '!**/*.html'], {restore: true});

// //     return gulp.src(path.dev.html+'/**/*.html')
// //         .pipe(useref())
// //         .pipe(jsFilter)
// //         .pipe(seajscombine(null, {
// //             except:['jquery', 'zepto']  //排除合并对象
// //         }))
// //         .pipe(uglify({
// //             mangle:{except: ['require', 'exports', 'module', '$']},  //排除混淆关键字
// //             compress: true  //类型:boolean  默认：true  是否完全压缩
// //         }))
// //         .pipe(jsFilter.restore)
// //         .pipe(cssFilter)
// //         .pipe(csso())
// //         .pipe(cssFilter.restore)
// //         .pipe(indexHtmlFilter)
// //         .pipe(rev())
// //         .pipe(indexHtmlFilter.restore)
// //         .pipe(revReplace())
// //         .pipe(gulp.dest(path.dist.html));
// // });

// // gulp.task('image', function() {
// //     return gulp.src(path.dev.img+'/**/*')
// //         .pipe(imagemin())
// //         .pipe(gulp.dest(path.dist.img))
// // });

// gulp.task('sass', function () {
//     return gulp.src(path.dev.sass+'/**/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(base64({
//             baseDir: 'public',
//             extensions: ['svg', 'png', /\.jpg#datauri$/i],
//             exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
//             maxImageSize: 8*1024, // bytes 
//             debug: true
//         }))
//         .pipe(gulp.dest(path.dev.css));
// });

// // gulp.task('html',function(){
// //     var options = {
// //         collapseWhitespace:true,  //清除空格
// //         collapseBooleanAttributes:true,   //省略布尔属性的值，比如：<input checked="checked"/>,就会变成 <input checked/>
// //         removeComments:true,         //清除html中注释的部分
// //         removeEmptyAttributes:false,    //清除所有的空属性
// //         removeScriptTypeAttributes:false,     //清除所有script标签中的type="text/javascript"属性
// //         removeStyleLinkTypeAttributes:false,    //清除所有Link标签上的type属性
// //         minifyJS:true,     //压缩html中的javascript代码
// //         minifyCSS:true     //压缩html中的css代码
// //     };
// //     return gulp.src(path.dev.html+'/**/*.html')
// //         .pipe(htmlmin(options))
// //         .pipe(gulp.dest(path.dist.html)); 
// // });

// // gulp.task("default", function() {
// //     gulp.run('lint', 'page', 'html', 'image');

// //     // 检测文件发送变化 - 分开监听为了执行对应的命令
// //     gulp.watch(path.dev.html+'/**/*.html', ['html']);
// //     gulp.watch(path.dev.img+'/**/*', ['image']);
// //     gulp.watch(path.dev.js+'/**/*.js', ['lint', 'page']);

// // });

// gulp.task("runsass", function() {
//     gulp.run('sass');

//     gulp.watch(path.dev.sass+'/**/*.scss', ['sass']);

// });

// gulp.task('help',function () {

//     console.log('   gulp               默认执行lint，page，html，image');
 
//     console.log('   gulp lint          检测js');
 
//     console.log('   gulp page          合并页面里注释的js和css，并加上版本号');

//     console.log('   gulp image         图片优化');

//     console.log('   gulp html          压缩html文件');

//     console.log('   gulp sass          sass转css');

//     console.log('   gulp runsass       sass转css，并监测sass文件');
 
// });
