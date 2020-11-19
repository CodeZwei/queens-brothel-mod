const gulp = require('gulp');
const del = require('del');
const zip = require('gulp-zip');

const config = require('./build/config.json')

gulp.task('delDist', () => {
    return del(['dist']);
});

gulp.task('delTemp', () => {
    return del(['temp']);
});

gulp.task('moveAssets', () => {
    return gulp.src('public/assets/**/*')
        .pipe(gulp.dest('temp/assets'));
});

gulp.task('moveConfigAndMod', () => {
    return gulp.src(['build/config.json', 'public/js/mod.js'])
        .pipe(gulp.dest('temp'));
});

gulp.task('zipFiles', () => {
    return gulp.src('temp/**')
        .pipe(zip(`${config.id}-${config.version}`))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('delDist', 'moveAssets', 'moveConfigAndMod', 'zipFiles', 'delTemp'));
