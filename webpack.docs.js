const configs = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const esConfig = configs[0];

const pages = [
  {
    name: 'sps-simple-demo',
    template: 'sps-simple-demo/sps-simple-demo.html',
    ts: 'sps-simple-demo/sps-simple-demo.ts',
  },
];

const htmlPlugins = pages.map(entry => new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'src-docs', entry.template),
  filename: `${entry.name}.html`,
  chunks: [entry.name],
  // inject: 'body',
  scriptLoading: 'module',
}));

const entry = {};
pages.forEach(page => { entry[page.name] = path.resolve(__dirname, 'src-docs', page.ts); });

module.exports = {
  ...esConfig,
  entry,
  output: {
    ...esConfig.output,
    path: path.resolve(__dirname, 'docs-dist'),
  },
  plugins: [
    ...esConfig.plugins ?? [],
    ...htmlPlugins,
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src-docs', 'styles'), to: 'styles' },
        { from: path.resolve(__dirname, 'src-docs', 'assets'), to: 'assets' },
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
