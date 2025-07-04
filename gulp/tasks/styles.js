const plumber = require('gulp-plumber'),
  scss = require('gulp-sass')(require('sass')),
  autoprefixer = require('gulp-autoprefixer'),
  csso = require('gulp-csso'),
  sourcemaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
  //FIXME: Починить gulp-stylelint
  // gulpStylelint = require('gulp-stylelint');
  stylesPATH = {
    "input": "./dev/static/styles/",
    "output": "./build/static/css/"
  };

module.exports = function () {
  $.gulp.task('styles:dev', () => {
    return $.gulp.src(stylesPATH.input + 'styles.scss')
      .pipe(plumber())
      // .pipe(gulpStylelint({
      //   reporters: [
      //     {
      //       formatter: 'string',
      //       console: true
      //     }
      //   ]
      // }))
      .pipe(sourcemaps.init())
      .pipe(scss())
      .pipe(autoprefixer({
        overrideBrowserslist:  ['last 3 versions']
      }))

      .pipe(sourcemaps.write())
      .pipe(rename('styles.min.css'))
      .pipe($.gulp.dest(stylesPATH.output))
      .on('end', $.browserSync.reload);
  });

  $.gulp.task('styles:build', () => {
    return $.gulp.src(stylesPATH.input + 'styles.scss')
      .pipe(scss())
      .pipe(autoprefixer({
        overrideBrowserslist:  ['last 3 versions']
      }))
      .pipe(autoprefixer())
      .pipe(rename('styles.min.css'))
      .pipe($.gulp.dest(stylesPATH.output))
  });

  $.gulp.task('styles:build-min', () => {
    return $.gulp.src(stylesPATH.input + 'styles.scss')
      .pipe(scss())
      .pipe(autoprefixer())
      .pipe(csso())
      .pipe(rename('styles.min.css'))
      .pipe($.gulp.dest(stylesPATH.output))
  });
};
