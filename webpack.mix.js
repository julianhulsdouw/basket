const mix = require('laravel-mix');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputDir = 'build/';

let indexFile = 'index.html';
if ((process.env.NODE_ENV || false) === 'development') {
    indexFile = 'index_dev.html';
}

mix
    .setPublicPath(outputDir)
    .js('src/main.js', outputDir)
    .ts('src/renderer.tsx', outputDir)
    .js('src/Components/Webviews/Library/servicePreload.js', outputDir)
    .webpackConfig({
        target: 'electron-renderer',
        plugins: [
            new LiveReloadPlugin(),
            new HtmlWebpackPlugin({
                template: './src/' + indexFile,
                filename: './index.html',
                chunks: [],
            }),
            new CopyWebpackPlugin([
                { from: './src/Static', to: 'Static' },
                { from: 'package.json' }
            ])
        ],
        node: {
            __dirname: false,
        }
    });
