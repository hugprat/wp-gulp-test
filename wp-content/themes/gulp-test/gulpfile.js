var gulp        = require("gulp");

var watch       =  require("gulp-watch");
var plumber     =  require("gulp-plumber");
var notify      =  require("gulp-notify");

var gulpsass    =  require('gulp-sass')(require('sass'));
var autoprefixer  =  require("gulp-autoprefixer");
var celancss    =  require("gulp-clean-css");
var sourcemaps    =  require("gulp-sourcemaps");

var browserSync = require('browser-sync');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');

var onError = function(error){
    console.log("Error: ", error.message);
    this.emit("end");
}

gulp.task("sass", function(){
    return gulp.src("./sass/style.scss")
        .pipe(plumber({errorHandler:onError}))
        .pipe(sourcemaps.init())
        .pipe(gulpsass())
        .pipe(autoprefixer("last 2 versions"))
        .pipe(gulp.dest("."))
        .pipe(celancss({KeepSpecialComments: 1}))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./"))
        .pipe(browserSync.stream())
        .pipe(notify({message:"tarea sass acabada"}))
});

gulp.task("javascript", function(){
    return gulp.src("./js/custom/**/*.js")
            .pipe(plumber({errorHandler:onError}))
            .pipe(concat("all.min.js"))
            .pipe(uglify())
            .pipe(gulp.dest("./js"))
            .pipe(notify({message: "JavaScript task finalizada"}))
});

gulp.task("watch", function(){
    browserSync.init({
		proxy: "localhost:9889",
		notify: false
	});
    gulp.watch("./sass/**/*.scss", gulp.series('sass'))
    gulp.watch("./js/custom/**/*.js",  gulp.series('javascript'))
});



gulp.task('default', gulp.series('watch', function(){
    
}));