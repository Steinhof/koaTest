const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');

/* File paths */
const cfg = require('./config/config.js');

/* Webpack notification stats object */
const webpackErrorHandler = require('./config/webpackErrorHandler');

// -----------------------------------------------------------------------------
// DELETE OLD FILES
// -----------------------------------------------------------------------------
gulp.task('CLEAN', () => {
    return del([cfg.paths.logs.base, './dist/*js']);
});

// -----------------------------------------------------------------------------
// NODE WEBPACK SERVER
// -----------------------------------------------------------------------------
gulp.task('START-SERVER', done => {
    webpack(require(cfg.configs.webpack.node), webpackErrorHandler);
    done();
});

// -----------------------------------------------------------------------------
// GULP START
// -----------------------------------------------------------------------------
gulp.task('default', gulp.series('CLEAN', 'START-SERVER'));
