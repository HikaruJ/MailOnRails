/* File: gulpfile.js */

//  Include Dependencies
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    csso = require('gulp-csso'),
    del = require('del'),
    filter = require('gulp-filter'),
    inject = require('gulp-inject'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    ngAnnotate = require('browserify-ngannotate'),
    ngHtml2Js = require('gulp-ng-html2js'),
    ngmin = require('gulp-ngmin'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    streamify = require('gulp-streamify'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    wiredep = require('wiredep').stream;

var config = {
    bowerDir: './bower_components',
    bowerJson: './bower.json'
};

//  Solution folder paths
var paths = {
    app: {
        root: './app/',

        modules: {
            root: './app/modules'
        }
    },

    assets: {
        root: './assets',

        css: {
            root: './assets/css',
            home: './assets/css/home',
            mail: './assets/css/mail'
        },

        icons: {
            root: './assets/icons'
        },

        images: {
            root: './assets/img'
        },

        javascript: {
            root: './assets/js'
        },

        plugins: {
            root: './assets/plugins'
        }
    },

    target: {
        root: './dist',

        css: {
            root: './dist/css',
            maps: './dist/css/maps'
        },

        fonts: {
            root: './dist/fonts'
        },

        icons: {
            root: './dist/icons'
        },

        images: {
            root: './dist/img'
        },

        javascript: {
            root: './dist/js',
            maps: './dist/js/maps'
        },

        plugins: {
            root: './dist/plugins'
        }
    }
};

//  Assets file paths
var assets = {
    css: {
        home: paths.assets.css.home + '/**/*.css',
        mail: paths.assets.css.mail + '/*.css',
        vendor: paths.assets.css.root + '/vendor.scss'
    },

    less: {
        home: paths.assets.css.home + '/**/*.less',
        mail: paths.assets.css.mail + '/**/*.less'
    },

    javascript: {
        root: paths.assets.javascript.root + '/**/*.js',
        vendor: paths.assets.javascript.root + '/vendor.js'
    }
};

//  Distribution target file paths
var target = {
    css: {
        home: paths.target.css.root + '/home.min.css',
        mail: paths.target.css.root + '/mail.min.css',
        vendor: paths.target.css.root + '/vendor.min.css'
    }
};

// Delete all files and folders from distribution folder
gulp.task('clean', function(cb) {
    return del(paths.target.root, cb);
});

//  Lint javascript files
gulp.task('lint', function() {
    return gulp.src('./assets/javascript/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

//  Copy fonts to the distribution folder
gulp.task('copy-fonts', function() { 
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest(paths.target.fonts.root));
});

gulp.task('copy-icons', function() {
    return gulp.src(paths.assets.icons.root + '/**/*.*')
        .pipe(gulp.dest(paths.target.icons.root));
});

//  Copy images to the distribution folder
gulp.task('copy-images', function() {
    return gulp.src([
            paths.assets.images.root + '/*.*',
            paths.assets.images.root + '/**/*.*'
        ])
        .pipe(gulp.dest(paths.target.images.root));
});

gulp.task('copy-plugins', function() {
    return gulp.src(paths.assets.plugins.root + '/**/*.*')
        .pipe(gulp.dest(paths.target.plugins.root));
});

// Convert and minify the mail css/less files to a single css file and copy it to the css distribution folder
gulp.task('build-mail-template', function() {
    return gulp.src([assets.css.mail, assets.less.mail])
        .pipe(sourcemaps.init())
        .pipe(concat('mail.min.css'))
        .pipe(less())
        .pipe(csso())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(paths.target.css.root));
});

// Convert and minify the home css/less files to a single css file and copy it to the css distribution folder
gulp.task('build-home-template', function() {
    return gulp.src([assets.css.home, assets.less.home])
        .pipe(sourcemaps.init())
        .pipe(concat('home.min.css'))
        .pipe(less())
        .pipe(csso())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(paths.target.css.root));
});

//  Inject a minified css file containing the bower css packages to the html file
gulp.task('inject-vendor', function() {
    return gulp.src(assets.css.vendor)
        .pipe(sourcemaps.init())
        .pipe(wiredep({}))
        .pipe(sass())
        .pipe(csso())
        .pipe(rename('vendor.min.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(paths.target.css.root));
});

//  Build a minified version of the angular view templates in a single file
gulp.task('build-template-cache', function() {
    return gulp.src(paths.app.modules.root + '/**/*.html')
        .pipe(ngHtml2Js({
            moduleName: "angularPartials",
            prefix: "/partials/"
        }))
        .pipe(ngmin())
        .pipe(concat('templates.min.js'))
        .pipe(gulp.dest(paths.target.javascript.root));
});

// Minify and browserify the javascript for distribution in a single file
gulp.task('browserify', function() {
    return browserify({
            entries: './index.js',
            transform: [ngAnnotate]
        })
        .bundle()
        .pipe(source('main.min.js'))
        .pipe(streamify(sourcemaps.init({
            loadMaps: true
        })))
        .pipe(streamify(ngmin()))
        // .pipe(streamify(uglify()))
        .pipe(streamify(sourcemaps.write('./maps')))
        .pipe(gulp.dest(paths.target.javascript.root));
});

// Inject css and javascript to the index.html and copy it to the distribution folder
gulp.task('html', [
        'build-template-cache', 'copy-fonts', 'copy-icons', 'copy-images', 'copy-plugins',
        'build-mail-template', 'build-home-template',
        'inject-vendor', 'browserify'
    ],
    function() {
        var cssInjectFiles = gulp.src([target.css.vendor, target.css.home, target.css.mail]);

        var injectOptions = {
            addRootSlash: false,
            ignorePath: ['src', 'dist']
        };

        return gulp.src('./index.html')
            .pipe(wiredep({
                exclude: [
                    'bower_components/angular/angular.js',
                    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
                ],
                ignorePath: /^(\.\.\/)+/
            }))
            .pipe(inject(gulp.src(paths.target.javascript.root + '/**/*.js', {
                read: false
            }), injectOptions))
            .pipe(inject(cssInjectFiles, injectOptions))
            .pipe(gulp.dest(paths.target.root));
    });

//  Load webserver for the application on port 9000
gulp.task('webserver', function() {
    connect.server({
        fallback: './dist/index.html',
        host: 'mailonrails.com',
        https: false,
        livereload: true,
        middleware: function(connect) {
            return [connect().use('/bower_components', connect.static('bower_components'))];
        },
        port: 9000,
        root: 'dist'
    });
});

gulp.task('watch', function() {
    //  Watch for changes in the app folder and update the main.min.js file
    gulp.watch(paths.app.root + '/**/*.*', ['build-template-cache', 'browserify']);

    // Watch for changes in the assets folder and update the distribution folder
    gulp.watch(paths.assets.root + '/**/*.*', ['clean', 'html']);
});

gulp.task('default', ['lint', 'html', 'webserver', 'watch'], function() {
    return gutil.log('Gulp is running!');
});