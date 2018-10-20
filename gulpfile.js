var gulp = require('gulp');
rename = require('gulp-rename'),
inject = require('gulp-inject-string');

const workboxConfig = `//networkfirst all routes
workbox.routing.registerRoute(
  new RegExp('/*'),
  workbox.strategies.networkFirst()
);\n\n`;

gulp.task('inject:before', function(){
  gulp.src('dist/service-worker.js')
    .pipe(inject.before('workbox.core', workboxConfig))
    .pipe(rename('service-worker.js'))
    .pipe(gulp.dest('dist/'));
});
 