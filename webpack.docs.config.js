const configs = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');

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
];

const specsPath = path.resolve(__dirname, 'src', 'docs', 'specs');
const specs = fs.readdirSync(specsPath);

function entries() {
  let entries = pages.reduce((acc, page) => {
    acc[page.name] = path.resolve(__dirname, 'src', 'docs', page.ts);
    return acc;
  }, {});
  entries.index = path.resolve(__dirname, 'src', 'docs', 'main.ts');

  entries = {
    ...entries,
    ...specs.reduce((acc, spec) => {
      acc[spec] = path.resolve(specsPath, spec);
      return acc;
    }, {}),
  };

  return entries;
}

function htmlPlugins() {
  let htmlPlugins = pages.map(entry => new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'docs', entry.template),
    filename: `${entry.name}.html`,
    chunks: [entry.name],
    scriptLoading: 'module',
  }));

  htmlPlugins.push(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'docs', 'index.mustache'),
    filename: 'index.html',
    chunks: ['index'],
    scriptLoading: 'module',
    inject: 'body',
  }));

  htmlPlugins = [
    ...htmlPlugins,
    ...specs.map(spec => new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'docs', 'spec-examples-generator', 'spec.html'),
      filename: `${spec}.html`,
      chunks: [spec],
      scriptLoading: 'module',
      title: spec,
    })),
  ];

  return htmlPlugins;
}

module.exports = {
  ...esConfig,
  entry: entries(),
  module: {
    rules: [{
      use: [{
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.docs.json',
        },
      }],
      test: /\.ts?$/,
      exclude: /node_modules/,
    }, {
      test: /index\.mustache$/,
      loader: 'mustache-loader',
      options: {
        tiny: true,
        render: {
          specs,
        },
      },
    }],
  },
  output: {
    clean: true,
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs'),
  },
  plugins: [
    ...esConfig.plugins ?? [],
    ...htmlPlugins(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src', 'docs', 'styles'), to: 'styles' },
        { from: path.resolve(__dirname, 'src', 'lib', 'specs', 'styles'), to: 'styles' },
        { from: path.resolve(__dirname, 'src', 'docs', 'assets'), to: 'assets' },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'src', 'docs'),
    },
    compress: false,
    port: 9000,
  },
};
