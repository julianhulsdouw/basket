const mix = require('laravel-mix');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputDir = 'build/';

let indexFile = 'index.html';

mix
    .setPublicPath(outputDir)
    .js('src/main.js', outputDir)
    .ts('src/renderer.js', outputDir)
    .webpackConfig({
        target: 'electron-renderer',
        plugins: [
            new LiveReloadPlugin(),
            new HtmlWebpackPlugin({
                template: './src/' + indexFile,
                filename: './index.html',
                chunks: [],
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: './src/static', to: 'Static' },
                    { from: 'package.json' }
                ]
            })
        ],
        node: {
            __dirname: false,
        }
    })
    .options({
        globalVueStyles: './src/sass/all.scss',
    });
