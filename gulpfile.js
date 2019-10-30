const gulp = require('gulp');
const swagger = ['src/swagger/swagger.json'];
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

const run = require('gulp-run');

gulp.task('swagger', function() {
  return gulp.src(swagger)
  .pipe(gulp.dest('dist/swagger'));
});

gulp.task('scripts', () => {
    const tsResult = tsProject.src()
    .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
    gulp.src('./src/config/products.json')
        .pipe(gulp.dest('dist/config/'));
});

gulp.task('watch', ['scripts'], () => {
    gulp.watch('src/**/*.ts', ['scripts']);
});
 

gulp.task('default', ['scripts', 'swagger','copy']);