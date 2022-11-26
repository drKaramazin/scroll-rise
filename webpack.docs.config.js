const configs = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const esConfig = configs[0];

const pages = [
  {
    name: 'earth-demo',
    template: 'demo/earth-demo/earth-demo.html',
    ts: 'demo/earth-demo/earth-demo.ts',
  },
  {
    name: 'sps-simple-demo',
    template: 'demo/sps-simple-demo/sps-simple-demo.html',
    ts: 'demo/sps-simple-demo/sps-simple-demo.ts',
  },
  {
    name: 'fixed-actors-scene-demo',
    template: 'demo/fixed-actors-scene-demo/fixed-actors-scene-demo.html',
    ts: 'demo/fixed-actors-scene-demo/fixed-actors-scene-demo.ts',
  },
  {
    name: 'sticky-platform-scene-demo',
    template: 'demo/sticky-platform-scene-demo/sticky-platform-scene-demo.html',
    ts: 'demo/sticky-platform-scene-demo/sticky-platform-scene-demo.ts',
  },
  {
    name: 'index',
    template: 'index.html',
    ts: 'main.ts',
  },
];

const htmlPlugins = pages.map(entry => new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'src', 'docs', entry.template),
  filename: `${entry.name}.html`,
  chunks: [entry.name],
  scriptLoading: 'module',
}));

const entry = {};
pages.forEach(page => { entry[page.name] = path.resolve(__dirname, 'src', 'docs', page.ts); });

module.exports = {
  ...esConfig,
  entry,
  output: {
    ...esConfig.output,
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs'),
  },
  plugins: [
    ...esConfig.plugins ?? [],
    ...htmlPlugins,
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src', 'docs', 'styles'), to: 'styles' },
        { from: path.resolve(__dirname, 'src', 'docs', 'assets'), to: 'assets' },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'src-docs'),
    },
    compress: false,
    port: 9000,
  },
};
