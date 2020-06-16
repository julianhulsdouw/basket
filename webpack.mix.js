const mix = require('laravel-mix');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const path = require('path');

const outputDir = 'build/';

mix.setPublicPath(outputDir)
    .js('src/app.js', outputDir)
    .js('src/main.js', outputDir)
    .js('src/preferences.js', outputDir)
    .js('src/library/preload.js', outputDir + 'services')
    .webpackConfig({
        target: 'electron-renderer',
        module: {
            rules: [
                {
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    enforce: 'pre',
                    exclude: /node_modules/,
                    options: {
                        formatter: require('eslint-friendly-formatter'),
                    },
                },
            ],
        },
        plugins: [
            new LiveReloadPlugin(),
            new HtmlWebpackPlugin({
                template: './src/app.html',
                filename: './app.html',
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
                    { from: './src/library/services', to: 'services' },
                    { from: 'package.json' },
                ],
            }),
            new StylelintPlugin({
                files: ['**/*.?(vue|scss)'],
                fix: false,
            }),
        ],
        node: {
            __dirname: false,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
            extensions: ['js', 'vue', 'json'],
        },
    })
    .options({
        globalVueStyles: './src/resources/sass/all.scss',
    });
