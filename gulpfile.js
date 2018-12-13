const gulp = require('gulp');
const concat =  require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('default', () => {
  return gulp.src('src/**/*.js')
    //Tira comentário e passa para versão mais nova
    .pipe(babel({
      minified: true,
      comments: false,
      presets: ["env"]
    }))
    //Mimifica o código
    // .pipe(uglify())
    .on('error', function (err) { console.log(err) })
     //Compacta o código
    .pipe(concat('codigo.min.js'))
    .pipe(gulp.dest('build'))
})
