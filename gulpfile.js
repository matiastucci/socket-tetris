//npm install --save-dev gulp-connect
//npm install --save-dev connect-history-api-fallback

var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    historyApiFallback = require('connect-history-api-fallback');

gulp.task('server', function() {
    connect.server({
      root: './public/mobile',
      hostname: '0.0.0.0',
      port: 8000,
      livereload: true,
      middleware: function(connect, opt) {
        return [ historyApiFallback ];
    }
  });
});

gulp.task('html', function() {
   gulp.src('./public/desktop/*.html')
     .pipe(connect.reload());
});

gulp.task('css', function() {
   gulp.src('./public/**/*.css')
     .pipe(connect.reload());
});

gulp.task('js', function() {
   gulp.src('./public/**/*.js')
     .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['./public/**/*.html'], ['html']);
  gulp.watch(['./public/**/*.css'], ['css']);
  gulp.watch(['./public/**/*.js'],   ['js']);
});

gulp.task('default', ['server', 'watch']);