const path = require('path');

module.exports = {
    entry: './src/index.ts',
    devtool: 'source-map',
    module: {
        rules: [{
            use: 'ts-loader',
            exclude: /node_modules/,
        }]
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'lib'),
        library: {
            name: 'scroll-rise',
            type: "umd",
        },
        globalObject: "this",
    },
    watchOptions: {
        ignored: /node_modules/,
    }
};
