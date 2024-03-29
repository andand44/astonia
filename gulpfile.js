var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	browserSync 	= require('browser-sync'),
	concat 			= require('gulp-concat'),
	uglify 			= require('gulp-uglifyjs'),
	cssnano 		= require('gulp-cssnano'),
	rename 			= require('gulp-rename'),
	del 			= require('del'),
	imagemin		= require('gulp-imagemin'),
	pngquant		= require('imagemin-pngquant'),
	cache 			= require('gulp-cache'),
	autoprefixer	= require('gulp-autoprefixer');

gulp.task('sass', function() {
	return gulp.src('src/sass/**/*.scss')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(autoprefixer(['last 5 versions', '>1%'], {cascade:true}))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
	return gulp.src([
		'src/libs/jquery/dist/jquery.min.js',
		'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/js'));
});

gulp.task('cssLibs', ['sass'], function() {
	return gulp.src('src/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('src/css'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false
	});
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox:false}],
		une: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});
	
gulp.task('watch', ['browser-sync', 'cssLibs', 'scripts'], function() {
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/*.html', browserSync.reload({stream: true}));
	gulp.watch('src/js/**/*.js', browserSync.reload({stream: true}));
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
	var buildCss = gulp.src([
		'src/css/main.css',
		'src/css/libs.min.css'
	])
	.pipe(gulp.dest('dist/css'));
	
	var buildFonts = gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));
	
	var buildJs = gulp.src('src/js/**/*')
	.pipe(gulp.dest('dist/js'));
	
	var buildHtml = gulp.src('src/*.html')
	.pipe(gulp.dest('dist'));
});