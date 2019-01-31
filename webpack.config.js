const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const host = process.env.HOST || 'localhost';

const paths = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    data: path.join(__dirname, 'data')
}

module.exports = {

    // https://github.com/d3/d3/wiki#supported-environments
    // If you are using a bundler, make sure your bundler is configured to consume the modules entry point in the package.json.
    // https://webpack.js.org/configuration/resolve/#resolve-mainfields
    resolve: {
        mainFields: ['module', 'browser', 'main']
    },
    // These are the "entry points" to our application.
    // This means they will be the "root" imports that are included in JS bundle.
    entry: ['./src/index.js'],
    // The output key describes the wanted output
    output: {
        library: "world",
        libraryTarget: "umd",
        umdNamedDefine: true,
        filename: 'world.js',
        // The build path
        path: paths.dist,
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: true,
        sourceMapFilename: '[file].map',
        // Point sourcemap entries to original disk location
        devtoolModuleFilenameTemplate: info =>
            path.resolve(info.absoluteResourcePath)
    },
    // No d3 in the bundle
    externals: {
        d3: 'd3'
    },
    // The dev server description
    devServer: {
        // By default WebpackDevServer serves:
        //      * physical files from the current directory
        //      * the virtual build files from memory.
        // The contentBase directory defines the location of the physical files that must be served
        contentBase: paths.dist,
        // By default files from `contentBase` will not trigger a page reload.
        watchContentBase: true,
        // Enable gzip compression of generated files.
        compress: true,
        // Silence WebpackDevServer's own logs since they're generally not useful.
        // It will still show compile warnings and errors with this setting.
        clientLogLevel: 'none',
        // Reportedly, this avoids CPU overload on some systems.
        // https://github.com/facebookincubator/create-react-app/issues/293
        watchOptions: {
            ignored: /node_modules/,
        },
        port: 9000,
        host: host,
        overlay: false,
        historyApiFallback: {
            // Paths with dots should still use the history fallback.
            // See https://github.com/facebookincubator/create-react-app/issues/387.
            disableDotRule: true,
        }
    },
    // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
    // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
    devtool: 'cheap-module-source-map', // or devtool: 'inline-source-map' or 'source-map'
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
        })
    ],
    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
        hints: false,
    },
}