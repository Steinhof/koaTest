const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

// Settings
const cfg = require('./config/config');
const webpackLogger = require('./config/webpackLogger');

module.exports = {
    target: 'node',
    context: __dirname,
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,
        __filename: false,
    },
    mode: 'production',
    entry: {
        server: path.resolve(__dirname, cfg.entries.server.main.ts),
    },
    output: {
        filename: '[name].js',
        publicPath: '',
        path: path.resolve(__dirname, cfg.paths.dist.base),
    },
    externals: [nodeExternals()], // Don't include node_nodules to server
    watch: true,
    stats: webpackLogger,
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    'cache-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true,
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new NodemonPlugin({
            ext: 'js, json',
            env: {
                // NODE_OPTIONS: '--inspect', // To node.js run debugger
            },
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
};
