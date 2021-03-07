const mix = require('laravel-mix');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

require('vuetifyjs-mix-extension');

const outputDir = 'build/';

mix.setPublicPath(outputDir)
    .ts('src/renderer.js', outputDir)
    .ts('src/main.js', outputDir)
    .ts('src/library/menu/webviewContext.js', outputDir + 'services')
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
            new HtmlWebpackPlugin({
                template: './src/app.html',
                filename: './app.html',
                chunks: [],
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: './src/resources/static', to: 'static' },
                    { from: './src/services', to: 'services' },
                    {
                        from: './src/library/preload/index.js',
                        to: 'services/preload.js',
                    },
                    {
                        from: './src/library/preload/notification.js',
                        to: 'services',
                    },
                    { from: './package.json' },
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
    })
    .options({
        globalVueStyles: './src/resources/sass/all.scss',
    })
    .vuetify();
