var gulp = require('gulp');
var tslint = require('gulp-tslint');
var exec = require('child_process').exec;
var istanbul = require("gulp-istanbul");
var mocha = require('gulp-mocha');

var del = require('del');

require('dotbin');

var tsFilesGlob = ['./src/index.ts', './test/**/*.ts', '!./test/utils/**/*.ts'];

var appName = (function (p) {
    return p.name;
})(require('./package.json'));


function clean() {
    return del([
        'lib/**/*'
    ]);
}

function runtslint() {
    return gulp.src(tsFilesGlob)
        .pipe(tslint({
            formatter: 'verbose' //'prose' //
        }))
        .pipe(tslint.report());
}

function tscbuild(done) {
    exec('tsc --version', function (err, stdout, stderr) {
        console.log('TypeScript ', stdout);
        if (stderr) {
            console.log(stderr);
        }
    });

    exec('tsc', function (err, stdout, stderr) {
        console.log(stdout);
        if (stderr) {
            console.log(stderr);
        }
        done(err);
    });
}

function runTests() {
    return gulp.src('lib/test/**/*.spec.js')
        .pipe(mocha({
            reporter: 'min',
        }))
        .pipe(istanbul.writeReports());
}

//run tslint task, then run update-tsconfig and gen-def in parallel, then run _build
var build = gulp.series(clean, runtslint, tscbuild);

gulp.task('build', build);

gulp.task('tscbuild', tscbuild);

gulp.task("istanbul:pre-test", function () {
    return gulp.src(['lib/src/**/*.js', '!lib/src/**/index.js'])
        // Covering files
        .pipe(istanbul({
            includeUntested: true
        }))
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task('test', gulp.series('istanbul:pre-test', runTests));

gulp.task('test-and-build', gulp.series('build', 'istanbul:pre-test', function () {
    return gulp.src('lib/test/**/*.spec.js')
        .pipe(mocha())
        .pipe(istanbul.writeReports());
}));

gulp.task('watch', function () {
    return gulp.watch(['./src/**/*.ts', './test/**/*.ts'], gulp.series('tscbuild'));
});