var path = require('path');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'test/**/*.js'
        ],

        preprocessors: {
            // add webpack as preprocessor
            'src/**/*.js': ['webpack', 'sourcemap'],
            'test/**/*.js': ['webpack', 'sourcemap']
        },
        webpack: { //kind of a copy of your webpack config
            devtool: 'inline-source-map', //just do inline source maps instead of the default
            resolve: {
                extensions: ['', '.js', '.jsx'],
                root : [
                    path.resolve('./src')
                ],
                alias: {
                    'styles' : path.join(__dirname, 'src/styles'),
                    'stores' : path.join(__dirname, 'src/stores'),
                    'actions' : path.join(__dirname, 'src/actions'),
                    'app' : path.join(__dirname, 'src/app')
                }
            },

            module: {
                loaders: [
                    {
                        test: /\.js(x)?$/,
                        loader: 'babel',
                        exclude: path.resolve(__dirname, 'node_modules'),
                        query: {
                            presets: [ 'es2015', 'react', 'airbnb']
                        }
                    },
                    {
                        test: /\.json$/,
                        loader: 'json',
                    },
                    { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
                    { test: /\.ttf$/,    loader: "file-loader" },
                    { test: /\.eot$/,    loader: "file-loader" },
                    { test: /\.svg$/,    loader: "file-loader" },
                    { test: /\.css$/, loader: "style!css" },
                ]
            },
            externals: {
                'jsdom' : 'window',
                'cheerio' : 'window',
                'react/lib/ReactContext': true,
                'react/lib/ExecutionEnvironment': true,
                'react/addons': true
            }
        },

        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        },

        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher'
        ],


        babelPreprocessor: {
            options: {
                presets: ['airbnb']
            }
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
    })
};
