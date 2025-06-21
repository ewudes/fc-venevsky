const imagemin = require('gulp-imagemin');
const imgCompress = require('imagemin-jpeg-recompress');

const imgPATH = {
  input: [
    './dev/static/images/**/*.{png,jpg,jpeg,gif,svg}',
    '!./dev/static/images/svg/*'
  ],
  output: './build/static/images/'
};

module.exports = function () {
  $.gulp.task('img:dev', () => {
    return $.gulp.src(imgPATH.input)
      .pipe($.gulp.dest(imgPATH.output));
  });

  $.gulp.task('img:build', () => {
    return $.gulp.src(imgPATH.input)
      .pipe(imagemin([
        imgCompress({
          loops: 4,
          min: 70,
          max: 80,
          quality: 'high'
        }),
        imagemin.gifsicle({ interlaced: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: false },
            { cleanupIDs: false }
          ]
        })
      ]))
      .pipe($.gulp.dest(imgPATH.output));
  });
};
