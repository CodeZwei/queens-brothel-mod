const gulp = require('gulp');
const del = require('del');
const zip = require('gulp-zip');

gulp.task('delDist', () => {
    return del(['dist']);
});

gulp.task('moveAssets', () => {
    return gulp.src('public/assets/**/*')
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('moveConfigAndMod', () => {
    return gulp.src(['build/config.json', 'public/js/mod.js'])
        .pipe(gulp.dest('dist'));
});

gulp.task('zipFiles', () => {
    return gulp.src('dist/**')
        .pipe(zip('mod.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('deleteFiles', () => {
    return del(['dist/**/*', '!dist/mod.zip']);
});

gulp.task('default', gulp.series('delDist', 'moveAssets', 'moveConfigAndMod', 'zipFiles', 'deleteFiles'));