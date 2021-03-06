var gulp = require("gulp")
  , gutil = require("gulp-util")
  , browserify = require("browserify")
  , babelify = require("babelify")
  , source = require('vinyl-source-stream');

gulp
  /** Build sources to bundle */
  .task("es6", function() {
    browserify({
        entries: "client/src/main.js"
      , extensions: [".js"]
      , paths: ["./", "node_modules/", "client/src/"]
    })
      .transform(babelify, { presets: ["es2015"] })
      .bundle()
      .on("error", gutil.log)
      .pipe(source("app.min.js"))
      .pipe(gulp.dest("client/dist"));
  })

  /** Watch all source files in directory */
  .task("watch", function() {
    gulp.watch(["client/src/**/*.js", "shared/**/*.js"], ["es6"]);
  })

  /** Default task */
  .task("default", ["watch"]);
