const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const c = require("ansi-colors");
const notifier = require("node-notifier");
const rename = require("gulp-rename");
const wait = require("gulp-wait");
const csso = require("gulp-csso");
const browserSync = require("browser-sync").create();
const webpack = require("webpack");
const fileinclude = require("gulp-file-include");
const image = require("gulp-image");

sass.compiler = require("sass"); ////node-sass dla klasycznego

const showError = function (err) {
  notifier.notify({
    title: "Error in sass",
    message: err.messageFormatted,
  });

  console.log(c.red("==============================="));
  console.log(c.red(err.messageFormatted));
  console.log(c.red("==============================="));
};

const server = (cb) => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    notify: false,
    //host: "192.168.0.24",
    //port: 3000,
    open: true,
    //browser: "google chrome"
  });

  cb();
};

const images = function () {
  return gulp
    .src("./src/images/*")
    .pipe(image())
    .pipe(gulp.dest("./dist/images"));
};
const imagesSlider = function () {
  return gulp
    .src("./src/images/slider/*")
    .pipe(image())
    .pipe(gulp.dest("./dist/images/slider"));
};
const fonts = function () {
  return gulp.src("./src/fonts/*").pipe(gulp.dest("./dist/fonts"));
};
const css = function () {
  return gulp
    .src("src/scss/style.scss")
    .pipe(wait(500))
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", showError)
    )
    .pipe(autoprefixer())
    .pipe(
      rename({
        suffix: ".min",
        basename: "style",
      })
    )
    .pipe(csso())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
};

const js = function (cb) {
  //https://github.com/webpack/docs/wiki/usage-with-gulp#normal-compilation
  return webpack(require("./webpack.config.js"), function (err, stats) {
    if (err) throw err;
    console.log(stats.toString());
    browserSync.reload();
    cb();
  });
};

const html = function (cb) {
  return gulp
    .src(["src/html/*.html"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("dist"))
};


const htmlReload = function (cb) {
  browserSync.reload();
  cb();
};

const watch = function () {
  gulp.watch("src/scss/**/*.scss", { usePolling: true }, gulp.series(css));
  gulp.watch("src/js/**/*.js", { usePolling: true }, gulp.series(js));
  gulp.watch(
    "src/html/**/*.html",
    { usePolling: true },
    gulp.series(html, htmlReload)
  );
};

exports.default = gulp.series(
  images,
  fonts,
  imagesSlider,
  css,
  html,
  js,
  server,
  watch
);
exports.css = css;
exports.html = html;
exports.watch = watch;
exports.js = js;
exports.images = images;
exports.imagesSlider = imagesSlider;
exports.fonts = fonts;
