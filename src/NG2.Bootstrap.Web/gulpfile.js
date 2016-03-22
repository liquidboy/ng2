/// <binding AfterBuild='default' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    install = require("gulp-install"),
    del = require("del"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    replace = require("gulp-replace-task"),
    uglify = require("gulp-uglify"),
    jspm = require("gulp-jspm"),
    less = require("gulp-less"),
    runseq = require("run-sequence"),
    typescript = require("gulp-typescript"),
    sourcemaps = require("gulp-sourcemaps"),
    fs = require("fs"),
    modernizr = require("gulp-modernizr"),
    pkg = require("./package.json");

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
gulp.task("copy", ["copy:static", "copy:node:libs:default", "copy:node:libs:ng2", "copy:ts"]);
gulp.task("compile", ["compile:less:rootApp", "compile:ts:rootApp", "compile:modernizr:all"]);
gulp.task("clean", ["clean:js", "clean:css", "clean:libs", "clean:themes", "clean:assets", "clean:root"]);
gulp.task("refresh", [""]);


//ensure default runs in a particular sequence
gulp.task("default:step1", ["copy"]);
gulp.task("default:step2", function (cb) { runseq("default:step1", ["compile"], cb); });
gulp.task("default:step3", function (cb) { runseq("default:step2", ["min"], cb); });
gulp.task("default", ["default:step3"]);








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

gulp.task("copy:node:libs:default", function (cb) {

    if (!fs.existsSync('wwwroot/libs/jquery'))
        gulp.src(["node_modules/jquery/**/*.js"])
            .pipe(gulp.dest("wwwroot/libs/jquery"));

    if (!fs.existsSync('wwwroot/libs/jquery-validation'))
        gulp.src(["node_modules/jquery-validation/**/*.js"])
            .pipe(gulp.dest("wwwroot/libs/jquery-validation"));

    if (!fs.existsSync('wwwroot/libs/jquery-validation-unobtrusive'))
        gulp.src(["node_modules/jquery-validation-unobtrusive/**/*.js"])
            .pipe(gulp.dest("wwwroot/libs/jquery-validation-unobtrusive"));

    if (!fs.existsSync('wwwroot/libs/react'))
        gulp.src(["node_modules/react/**/*.js"])
            .pipe(gulp.dest("wwwroot/libs/react"));


    cb();
});

gulp.task("copy:node:libs:ng2", function (cb) {
    if (!fs.existsSync('wwwroot/libs/angular2'))
        gulp.src(["node_modules/angular2/**/*.js"])
            .pipe(gulp.dest("wwwroot/libs/angular2"));

    if (!fs.existsSync('wwwroot/libs/es6-promise'))
        gulp.src(["node_modules/es6-promise/**/*.js"])
            .pipe(gulp.dest("wwwroot/libs/es6-promise"));

    if (!fs.existsSync('wwwroot/libs/es6-shim'))
        gulp.src(["node_modules/es6-shim/**/*.js"])
            .pipe(gulp.dest("wwwroot/libs/es6-shim"));

    if (!fs.existsSync('wwwroot/libs/es5-shim'))
        gulp.src(["node_modules/es5-shim/**/*.js"])
            .pipe(gulp.dest("wwwroot/libs/es5-shim"));

    if (!fs.existsSync('wwwroot/libs/reflect-metadata'))
        gulp.src(["node_modules/reflect-metadata/**/*.js"])
            .pipe(gulp.dest("wwwroot/libs/reflect-metadata"));

    if (!fs.existsSync('wwwroot/libs/rimraf'))
        gulp.src(["node_modules/rimraf/**/*.js"])
            .pipe(gulp.dest("wwwroot/libs/rimraf"));

    if (!fs.existsSync('wwwroot/libs/rxjs'))
        gulp.src(["node_modules/rxjs/**/*.js"])
            .pipe(gulp.dest("wwwroot/libs/rxjs"));

    if (!fs.existsSync('wwwroot/libs/systemjs'))
        gulp.src(["node_modules/systemjs/**/*.js"])
            .pipe(gulp.dest("wwwroot/libs/systemjs"));

    if (!fs.existsSync('wwwroot/libs/zone.js'))
        gulp.src(["node_modules/zone.js/**/*.js"])
            .pipe(gulp.dest("wwwroot/libs/zone.js"));

    if (!fs.existsSync('wwwroot/libs/flux'))
        gulp.src(["node_modules/flux/**/*.js"])
            .pipe(gulp.dest("wwwroot/libs/flux"));

    if (!fs.existsSync('wwwroot/libs/events'))
        gulp.src(["node_modules/events/**/*.js"])
            .pipe(gulp.dest("wwwroot/libs/events"));

    if (!fs.existsSync('wwwroot/libs/moment'))
        gulp.src(["node_modules/moment/**/*.js"])
            .pipe(gulp.dest("wwwroot/libs/moment"));


    cb();
});

gulp.task("copy:ts", function (cb) {
    gulp.src(["rootApp/**/*.ts"])
        .pipe(gulp.dest("wwwroot/rootApp/"));

    cb();
});









//==========
//Compile
//==========

gulp.task("compile:less:rootApp", function (cb) {
    return gulp.src(["rootApp/**/*.less"])
    .pipe(less())
    .pipe(gulp.dest("wwwroot/rootApp/"));
});

gulp.task("compile:ts:rootApp", function (cb) {
    var projectts = typescript.createProject("rootApp/tsconfig.json");
    var projecttsx = typescript.createProject("rootApp/tsconfig.json");

    gulp.src(["rootApp/**/*.ts"])
        .pipe(sourcemaps.init())
        .pipe(typescript(projectts))
        .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '' }))
        .pipe(gulp.dest("wwwroot/rootApp/"));

    gulp.src(["rootApp/**/*.tsx"])
        .pipe(typescript(projecttsx))
        .pipe(gulp.dest("wwwroot/rootApp/"));

    gulp.src(["rootApp/**/*.html"])
        .pipe(gulp.dest("wwwroot/rootApp/"));

    cb();
});


gulp.task("compile:modernizr:all", function (cb) {
    return gulp.src(["node_modules/modernizr/*/*.js"])
    .pipe(modernizr({
        tests: [
            'blobconstructor',
            'contenteditable',
            'vml',
            'webgl',
            'touch',
            [
              "devicemotion",
              "deviceorientation"
            ],
            "framed"
        ],
        options: ["setClasses"]
    }))
    .pipe(gulp.dest("wwwroot/js/"));
});
















//http://stackoverflow.com/questions/33683885/angular2-with-asp-net-5
//==========
//Bundle
//==========

gulp.task("bundle:app:all", function (cb) {
    return gulp.src("./wwwroot/rootApp/boot.js")
      .pipe(jspm({ selfExecutingBundle: true }))
      .pipe(gulp.dest("./wwwroot/rootApp-build/"));
});
