const path = require('path');

const esConfig = {
  entry: './src/lib/index.ts',
  devtool: 'source-map',
  module: {
    rules: [{
      use: 'ts-loader',
      test: /\.ts?$/,
      exclude: /node_modules/,
    }],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.es.js',
    path: path.resolve(__dirname, 'lib'),
    clean: true,
    library: {
      type: 'module',
    },
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  experiments: {
    outputModule: true,
  },
};

const umdConfig = {
  ...esConfig,
  output: {
    ...esConfig.output,
    filename: 'index.umd.js',
    library: {
      name: 'scroll-rise',
      type: 'umd',
    },
    globalObject: 'this',
  },
};

module.exports = [esConfig, umdConfig];
