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
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    wiredep = require('wiredep').stream;

var config = {
     bowerDir: './bower_components' ,
    bowerJson: './bower.json'
};

//  Solution folder paths
var paths = {
  assets: {
    root: './assets/',

    css: {
      root: './assets/css',
      admin: './assets/css/admin/',
      landingPage: './assets/css/landingPage/'
    },

    javascript: {
      root: './assets/js'
    }
  },

  target: {
    root: './dist/',

    css: {
      root: './dist/css'
    },

    fonts: {
      root: './dist/fonts'
    },

    javascript: {
      root: './dist/js'
    }
  }
};

//  Assets file paths
var assets = {
  css: {
    admin: paths.assets.css.admin + '/**/*.css',
    landingPage: paths.assets.css.landingPage + '/**/*.css',
    vendor: paths.assets.css.root + '/vendor.scss'
  },

  less : {
    admin: paths.assets.css.admin + '/**/*.less',
    landingPage: paths.assets.css.landingPage + '/**/*.less'
  },

  javascript: {
    root: paths.assets.javascript.root + '/**/*.js',
    vendor: paths.assets.javascript.root + '/vendor.js'
  }
};

//  Distribution target file paths
var target = {
  css: {
    admin: paths.target.css.root + '/admin.min.css',
    landingPage: paths.target.css.root + '/landingPage.min.css',
    vendor: paths.target.css.root + '/vendor.min.css'
  }
}

// Delete all files and folders from distribution folder
gulp.task('clean', function(cb){
  return del([
    paths.target.css.root + '/**/*',
    paths.target.fonts.root + '/**/*',
    paths.target.javascript.root + '/**/*',
    paths.target.root + '/**/*'
  ], cb);
});

//  Lint javascript files
gulp.task('lint', function() {
  return gulp.src('./assets/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Convert and minify the admin css/less files to a single css file and copy it to the css distribution folder
gulp.task('admin', function(){
  return gulp.src([assets.css.admin, assets.less.admin])
    .pipe(concat('admin.min.css'))
    .pipe(less())
    .pipe(csso())
    .pipe(gulp.dest(paths.target.css.root))
});

// Convert and minify the landing page css/less files to a single css file and copy it to the css distribution folder
gulp.task('landingPage', function(){
  return gulp.src([assets.css.landingPage, assets.less.landingPage])
    .pipe(concat('landingPage.min.css'))
    .pipe(less())
    .pipe(csso())
    .pipe(gulp.dest(paths.target.css.root))
});

gulp.task('inject-vendor', function(){
  return gulp.src(assets.css.vendor)
    .pipe(wiredep({}))
    .pipe(sass())
    .pipe(csso())
    .pipe(rename('vendor.min.css'))
    .pipe(gulp.dest(paths.target.css.root));
});

gulp.task('fonts', function() { 
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*') 
      .pipe(gulp.dest(paths.target.fonts.root)); 
});

// Inject css and javascript to the index.html and copy it to the distribution folder
gulp.task('html', ['admin', 'landingPage', 'inject-vendor', 'fonts'], function(){
  var injectFiles = gulp.src([target.css.admin, target.css.landingPage, target.css.vendor]);

  var injectOptions = {
    addRootSlash: false,
    ignorePath: ['src', 'dist']
  };

  return gulp.src('./index.html')
    .pipe(wiredep({}))
    .pipe(inject(injectFiles, injectOptions))
    .pipe(gulp.dest(paths.target.root))
});

// Minify and browserify the javascript for distribution in a single file
gulp.task('browserify', function() {
  return browserify('./index.js')
    .bundle()
    .pipe(source('main.min.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(paths.target.javascript.root));
});

//  Load webserver for the application on port 9000
gulp.task('webserver', function() {
  connect.server({
    host: 'mailonrails.com',
    livereload: true,
    port: 9000
  });
});

gulp.task('default', ['clean', 'lint', 'html', 'browserify', 'webserver'], function() {
  return gutil.log('Gulp is running!');
});
