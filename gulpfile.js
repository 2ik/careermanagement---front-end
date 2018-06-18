var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    gfonts = require('gulp-gfonts'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
	concat      = require('gulp-concat'), // для конкатенации файлов
	uglify      = require('gulp-uglifyjs'), // для сжатия JS
	cssnano     = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    clean       = require('gulp-clean'),
	rename      = require('gulp-rename'); // Подключаем библиотеку для переименования файлов

gulp.task('browser-sync', function() {
    browserSync({ 
        server: { 
            baseDir: 'app'
        },
        notify: false 
    });
});

gulp.task('less', function () {
    return gulp.src('app/less/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('app/css'))
});

gulp.task('css-libs', ['less', 'clean-css'], function() {
    return gulp.src([
    'app/css/bootstrap.min.css',
    'app/libs/owl.carousel/dist/assets/owl.carousel.min.css',
    'app/css/main.css',
    'app/libs/fancybox/dist/jquery.fancybox.min.css'
    ]) 
    .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
    .pipe(concat('core.min.css'))
    .pipe(cssnano()) 
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
    return gulp.src([ 
    'app/libs/jquery/dist/jquery.min.js',
    'app/libs/owl.carousel/dist/owl.carousel.min.js',
    'app/libs/fancybox/dist/jquery.fancybox.min.js',
    'app/libs/bootstrap/dist/js/bootstrap.min.js',
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyBvpoCWQnhgWPlHDtPLtWn24Mpjqd0hSgI&callback=initMap',
    ])
    .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
    .pipe(uglify()) 
    .pipe(gulp.dest('app/js'));
});


gulp.task('clean-css', function () {
    return gulp.src('app/css/core.min.css', {read: false})
    .pipe(clean());
});

gulp.task('watch', ['browser-sync', 'css-libs','scripts'], function () {
    gulp.watch('app/less/**/*.less', ['css-libs']); 
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
