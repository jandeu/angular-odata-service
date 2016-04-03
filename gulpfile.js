var gulp = require("gulp");
var rimraf = require("rimraf");
var ts = require("gulp-typescript");

var paths = {
    ts: "./src/**/*.ts",
    distJs: "./dist/angular-odata-service.js"
};

gulp.task("build", function() {
    var tsProject = ts.createProject('tsconfig.json');

    var tsResult = tsProject.src() // instead of gulp.src(...) 
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest(''));
});

gulp.task("clean", function(cb) {
    rimraf("./dist/**", cb);
});