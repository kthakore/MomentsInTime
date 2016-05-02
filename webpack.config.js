var path = require('path'),
    webpack  = require('webpack');
module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './src/entry.js'
    ],
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
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
                exclude: /node_modules/,
                loader: 'babel',
                include: __dirname,
                query: {
                    presets: [ 'es2015', 'react', 'react-hmre']
                }
            },
            { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" },
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
