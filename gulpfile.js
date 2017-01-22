var gulp = require('gulp');
var tslint = require('gulp-tslint');
var exec = require('child_process').exec;
var istanbul = require("gulp-istanbul");
var mocha = require('gulp-mocha');
var tsconfig = require('gulp-tsconfig-files');

var del = require('del');

// var reporter = new JasmineConsoleReporter({
//     activity: false,
//     cleanStack: 1, // (0|false)|(1|true)|2|3 
//     colors: 2, // (0|false)|(1|true)|2 
//     listStyle: 'indent', // "flat"|"indent" 
//     verbosity: 1, // (0|false)|1|2|(3|true)|4 
// });

require('dotbin');

var tsFilesGlob = ['./src/**/*.ts', './test/**/*.ts', '!./src/**/index.ts'];
var tsFilesGlob2 = ['./src/**/*.ts', './test/**/*.ts', '!./src/**/index.ts', './typings/index.d.ts'];

var appName = (function (p) {
    return p.name;
})(require('./package.json'));

function updatetsconfig() {
    return gulp.src(tsFilesGlob2)
        .pipe(tsconfig());
}

function clean() {
    return del([
        'lib/**/*'
    ]);
}

function runtslint() {
    return gulp.src(tsFilesGlob)
        .pipe(tslint({
            formatter: 'verbose'
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

//run tslint task, then run update-tsconfig and gen-def in parallel, then run _build
var build = gulp.series(clean, runtslint, updatetsconfig, tscbuild);

gulp.task('build', build);

gulp.task('tscbuild', tscbuild);

gulp.task("istanbul:pre-test", function () {
    return gulp.src(['lib/src/**/*.js', '!lib/src/**/index.js'])
        // Covering files
        .pipe(istanbul({ includeUntested: true }))
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task('test', gulp.series('istanbul:pre-test', function () {
    return gulp.src('lib/test/**/*.spec.js')
        .pipe(mocha({
            reporter: 'min',
        }))
        .pipe(istanbul.writeReports());
}));

gulp.task('test-and-build', gulp.series('build', 'istanbul:pre-test', function () {
    return gulp.src('lib/test/**/*.spec.js')
        .pipe(mocha())
        .pipe(istanbul.writeReports());
}));

gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', ['build']);
});
