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