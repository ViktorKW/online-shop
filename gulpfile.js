const gulp = require("gulp");
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync");

// // --------for testing start
// var open = require("gulp-open");
// // Default usage:
// // Open one file with default application

// gulp.task("open", function () {
//   gulp.src("home.html").pipe(open());
// });
// // --------for testing end

function browserSyncServer(cb) {
  browserSync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

function watchTask() {
  watch("*.html", browserSyncReload);
  watch(
    ["src/scss/*.scss", "src/js/*.js"],
    series(minCSS, minJS, browserSyncReload)
  );
}

function minCSS() {
  return src(["src/scss/*.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest("dist/css"));
}

function minJS() {
  return src(["src/js/*.js"])
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(dest("dist/js/"));
}

function minImg() {
  return src(["src/img/*"]).pipe(imagemin()).pipe(dest("dist/img"));
}

exports.default = series(minCSS, minJS, minImg, browserSyncServer, watchTask);
