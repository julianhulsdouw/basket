const mix = require('laravel-mix');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputDir = 'build/';

mix
    .setPublicPath(outputDir)
    .js('src/main.js', outputDir)
    .js('src/renderer.js', outputDir)
    .js('src/preferences.js', outputDir)
    .webpackConfig({
        target: 'electron-renderer',
        plugins: [
            new LiveReloadPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: './index.html',
                chunks: [],
            }),
            new HtmlWebpackPlugin({
                template: './src/preferences.html',
                filename: './preferences.html',
                chunks: [],
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: './src/resources/static', to: 'static' },
                    { from: 'package.json' }
                ]
            })
        ],
        node: {
            __dirname: false,
        }
    })
    .options({
        globalVueStyles: './src/resources/sass/all.scss',
    });
