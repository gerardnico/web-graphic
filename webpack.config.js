const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const paths = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    data: path.join(__dirname, 'data')
}

module.exports = {
    // The entry key describes the entry file where the scripts and styles should be imported to
    entry: ['./src/index.js'],
    // The output key describes the wanted output
    output: {
        filename: 'bundle.js',
        path: paths.dist,
        pathinfo: true,
        sourceMapFilename: '[file].map'
    },
    // The dev server description
    devServer: {
        contentBase: paths.dist,
        compress: true,
        port: 9000
    },
    devtool: 'inline-source-map', // or devtool: 'inline-source-map' or 'source-map'
    plugins: [
        // Copy the data
        new CopyWebpackPlugin([
            {
                from: paths.data,
                to: paths.dist + '/data'
            }
        ]),
        // // https://webpack.js.org/guides/migrating/#debug
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            exclude: ['vendors.js'],
            columns: false, // no columns in SourceMaps
            module: false / true // use SourceMaps from loaders 
         })
    ],
}