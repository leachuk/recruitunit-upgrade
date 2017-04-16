'use strict';

import gulp     from 'gulp';
import webpack  from 'webpack';
import path     from 'path';
import sync     from 'run-sequence';
import fs       from 'fs';
import yargs    from 'yargs';
import gutil    from 'gulp-util';
import serve    from 'browser-sync';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpachHotMiddelware from 'webpack-hot-middleware';
import colorsSupported      from 'supports-color';
import historyApiFallback   from 'connect-history-api-fallback';
import gulpNgConfig from 'gulp-ng-config';
import rename from 'gulp-rename';

let root = 'src';

// helper method for resolving paths
let resolveToApp = (glob = '') => {
	return path.join(root, 'app', glob); // app/{glob}
};

let resolveToComponents = (glob = '') => {
	return path.join(root, 'app/components', glob); // app/components/{glob}
};

// map of all paths
let paths = {
	js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
	styl: resolveToApp('**/*.styl'), // stylesheets
	html: [
		resolveToApp('**/*.html'),
		path.join(root, 'index.html')
	],
	entry: path.join(__dirname, root, 'app/recruitUnitApp.js'),
	output: root,
	blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**')
};

// use webpack.config.js to build modules
gulp.task('webpack', (cb) => {
	const config = require('./webpack.dist.config');
	config.entry.app = paths.entry;

	gulp.src('recruitunit.prod.config.json')
		.pipe(gulpNgConfig('recruitunit.config'))
		.pipe(rename('recruitunit.config.js'))
		.pipe(gulp.dest('./src/app/'));

	webpack(config, (err, stats) => {
		if (err) {
			throw new gutil.PluginError("webpack", err);
		}

		gutil.log("[webpack]", stats.toString({
			colors: colorsSupported,
			chunks: false,
			errorDetails: true
		}));

		cb();
	});

});

gulp.task('serve', () => {
	const config = require('./webpack.dev.config');
	config.entry.app = [
		// this modules required to make HRM working
		// it responsible for all this webpack magic
		'webpack-hot-middleware/client?reload=true',
		// application entry point
		paths.entry
	];

	var compiler = webpack(config);

	gulp.src('recruitunit.dev.config.json')
		.pipe(gulpNgConfig('recruitunit.config'))
		.pipe(rename('recruitunit.config.js'))
		.pipe(gulp.dest('./src/app/'));

	serve({
		port: process.env.PORT || 3000,
		open: false,
		server: {baseDir: root},
		middleware: [
			historyApiFallback({
				rewrites: [
					{from: /^\/[a-z]+\/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]\/?[a-z].+/, to: '/index.html'}
				]
			}),
			webpackDevMiddelware(compiler, {
				stats: {
					colors: colorsSupported,
					chunks: false,
					modules: false
				},
				publicPath: config.output.publicPath
			}),
			webpachHotMiddelware(compiler)
		]
	});
});

gulp.task('watch', ['serve']);

gulp.task('default', ['serve']);
