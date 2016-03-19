/// <binding AfterBuild='compile, copy, min' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    install = require("gulp-install"),
    del = require("del"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    replace = require("gulp-replace-task"),
    uglify = require("gulp-uglify");

var paths = {
    webroot: "./wwwroot/",
    staticRoot: "./_staticFiles/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";


//==========
//Bound tasks
//==========

gulp.task("min", [""]);
gulp.task("copy", ["copy:static"]);
gulp.task("compile", [""]);
gulp.task("clean", ["clean:js", "clean:css", "clean:libs", "clean:themes", "clean:assets", "clean:root"]);
gulp.task("refresh", [""]);

gulp.task("default", [""]);



//==========
//clean
//==========
gulp.task("clean:js", function (cb) {
    return del([paths.webroot + "js/**/*"]);
});

gulp.task("clean:css", function (cb) {
    return del([paths.webroot + "css/**/*"]);
});

gulp.task("clean:libs", function (cb) {
    return del([paths.webroot + "libs/**/*"]);
});

gulp.task("clean:themes", function (cb) {
    return del([paths.webroot + "themes/**/*"]);
});

gulp.task("clean:assets", function (cb) {
    return del([paths.webroot + "assets/**/*"]);
});

gulp.task("clean:root", function (cb) {
    return del([paths.webroot + "**/*"]);
});









//==========
//COPY 
//==========


gulp.task("copy:static", function (cb) {
    
    gulp.src(["_staticFiles/root/**/*"])
        .pipe(gulp.dest("wwwroot/"));

    gulp.src(["_staticFiles/assets/**/*"])
        .pipe(gulp.dest("wwwroot/assets/"));

    gulp.src(["_staticFiles/js/**/*"])
        .pipe(gulp.dest("wwwroot/js/"));

    gulp.src(["_staticFiles/css/**/*"])
        .pipe(gulp.dest("wwwroot/css/"));

    cb();
});
