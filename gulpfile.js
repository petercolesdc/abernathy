var gulp            = require("gulp")
    sass            = require("gulp-sass")
    autoprefixer    = require("gulp-autoprefixer")
    sassGlob        = require('gulp-sass-glob')
    glob            = require("glob")
    del             = require("del")
    nunjucksRender  = require("gulp-nunjucks-render")
    browserSync     = require("browser-sync").create()
    plumber         = require("gulp-plumber")
    svgSprite       = require("gulp-svg-sprite")
    prettyUrl       = require("gulp-pretty-url");

    // --------------------------------

    // Concat and copy CSS
    gulp.task("scss", function (done) {
      gulp.src("scss/**/*.scss")
        .pipe(plumber())
        .pipe(sassGlob())
        .pipe(sass({outputStyle : "compressed"}))
        .pipe(autoprefixer({
          grid: "true",
        }))
        .pipe(gulp.dest("public/css/"))
        done()
    })

    // Copy javascript
    gulp.task("js", function (done) {
      gulp.src("js/**/*.js")
        .pipe(plumber())
        .pipe(gulp.dest("public/js/"))
        done()
    })

    // Assets copy
    gulp.task("assets", function (done) {
      gulp.src("assets/**/*")
        .pipe(plumber())
        .pipe(gulp.dest("public/assets/"))
        done()
    })

    // Watch asset folders for changes
    gulp.task("watch", gulp.parallel("scss", "js", "assets"), function (done) {
      gulp.watch("js/**/*", ["js"])
      gulp.watch("scss/**/*", ["scss"])
      gulp.watch("assets/**/*", ["assets"])
      done()
    })

    // SVG Config
    var config = {
      shape: {
        id: {
          separator: "_",
          whitespace: '_'
        }
      },
      mode: {
        symbol: { // symbol mode to build the SVG
          dest: 'assets/icons/renders',
          sprite: 'sprite.svg',
          example: true,
          dimensions: "_svg",
          prefix: ".icon_"
        }
      },
      svg: {
        namespaceIDs: false,
        dimensionAttributes: false,
        xmlDeclaration: false, // strip out the XML attribute
        doctypeDeclaration: false // don't include the !DOCTYPE declaration
      }
    };

    gulp.task('sprite-page', function(done) {
      gulp.src('assets/icons/source/**/*.svg')
        .pipe(plumber())
        .pipe(svgSprite(config))
        .pipe(gulp.dest('.'));
        done()
    });

    gulp.task('sprite-shortcut', function(done) {
      gulp.src('assets/icons/renders/*')
        .pipe(plumber())
        .pipe(gulp.dest('templates/'));
        done()
    });


    // --------------------------------------
    // Templates and watch
    // --------------------------------------

    // Render templates
    gulp.task("render", function (done) {
      gulp.src("templates/**/*.html")
        .pipe(plumber())
        .pipe(nunjucksRender(
          {
            path: "templates",
            inheritExtension: true,
          }))
        .pipe(prettyUrl())
        .pipe(gulp.dest("public"))
        done()
    })

    // Watch more things
    //gulp.task("watch-all", ["scss", "render", "assets", "js"], function () {
    gulp.task("watch-all", gulp.parallel("scss", "render", "js", "assets"), function (done) {
      gulp.watch("js/**/*", ["js"])
      gulp.watch("templates/**/*", ["render"])
      gulp.watch("scss/**/*", ["scss"])
      gulp.watch("assets/**/*", ["assets"])
      done()
    })

    // Spin up server
    gulp.task('browser-sync', function(done) {
        browserSync.init({
            server: {
                baseDir: "public",
            },
            notify: false,
            open: false,
            scrollProportionally: false,
            reloadDelay: 500,
            reloadDebounce: 500,
            scrollRestoreTechnique: 'cookie'
        });
        //gulp.watch("public/**/*").on('change', browserSync.reload);
        gulp.watch("public/**/*");
        done()
    });

    // --------------------------
    // Task runners syntax
    // --------------------------

    // Just do a render
    //gulp.task("default", gulp.series("render"));

    // Spins up a sever to render test templates
    //gulp.task("serve", gulp.series(gulp.parallel("watch-all", "browser-sync")))
    gulp.task("serve", gulp.parallel("watch-all", "browser-sync"), function(done) {
      done()
    })

    // Run a build
    //gulp.task("build", gulp.parallel("scss", "js", "assets", "render"))
    //gulp.task("build", ["scss", "js", "assets", "render"])
    gulp.task("build", gulp.parallel("scss", "js", "assets"), function(done) {
      done()
    })

    // Icon Build
    //gulp.task('icons:build', ['sprite-page']);
    gulp.task("icons:build", gulp.parallel("sprite-page"), function(done) {
      done()
    })
