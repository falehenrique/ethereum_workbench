// const gulp = require('gulp');
// const browserSync = require('browser-sync').create();

// const reload = browserSync.reload;

// let dev = true;

// gulp.task('styles', () => {
//   return gulp.src('app/css/*.css')
//     .pipe(reload({stream: true}));
// });

// gulp.task('scripts', () => {
//   return gulp.src('app/scripts/**/*.js')
//     .pipe(reload({stream: true}));
// });


// gulp.task('html', ['styles', 'scripts'], () => {
//   return gulp.src('app/*.html')
//     .pipe(reload({stream: true}));
// });

// gulp.task('server', () => {
//   runSequence(['styles', 'scripts', 'html'], () => {
//     browserSync.init({
//       notify: false,
//       port: 9000,
//       server: {
//         baseDir: ['app'],
//       }
//     });

//     gulp.watch([
//       'app/*.html'
//     ]).on('change', reload);

//     gulp.watch('app/css/**/*.css', ['styles']);
//     gulp.watch('app/scripts/**/*.js', ['scripts']);
//   });
// });

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
    gulp.watch("./app/*.html").on("change", reload);
    gulp.watch("app/scripts/**/*.js").on("change", reload);    
    gulp.watch("app/css/**/*.css").on("change", reload);     
});