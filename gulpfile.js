var gulp = require("gulp"),
    rimraf = require("rimraf"),
    ts = require("gulp-typescript"),
    merge = require('merge2'),
    uglify = require('gulp-uglify'),
    tslint = require('gulp-tslint'),
    rename = require("gulp-rename"),
    browserSync = require("browser-sync"),
    sourcemaps = require('gulp-sourcemaps');

var paths = {
    ts: "./src/**/*.ts"
};

gulp.task("build", ["clean"], function () {
    var tsProject = ts.createProject('tsconfig.json');
    var tsProject2 = ts.createProject('tsconfig.json');

    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    var stream = merge();
    stream.add([
        tsProject2.src()
            .pipe(ts(tsProject2))
            .pipe(gulp.dest('./dist')),
        tsResult.js
            .pipe(uglify())
            .pipe(rename("angular-odata-service.min.js"))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest('./dist')),
        tsResult.dts.pipe(gulp.dest('./dist'))
    ]
    );
    return stream;
});

gulp.task('serve', ["build"], function() {
  process.stdout.write('Starting browserSync and superstatic...\n');
  browserSync({
    port: 3000,
    files: ['**/*.html', '**/*.js'],
    injectChanges: true,
    logFileChanges: false,
    logLevel: 'silent',
    logPrefix: 'angular-odata-service',
    notify: true,
    reloadDelay: 0,
    server: {
      baseDir: './'
    }
  });
});

gulp.task("clean", function (cb) {
    rimraf("./dist/**", cb);
});