const path = require('path');

const BundleSizePlugin = require('./plugins/bundle-size.complete.js');
// const AliasPlugin = require('./plugins/alias.complete.js');

module.exports = {
  mode: 'development',
  devtool: false,
  // entry: './input/app1.js',
  // entry: ['./input/app1.js', './input/app2.js'],
  entry: {
    app1: './input/app1.js',
    app2: './input/app2.js'
  },
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: '[name].js'
  },
  plugins: [
    // WE'RE GOING TO ADD OUT PLUGINS HERE
    new BundleSizePlugin({
      good: 4,
      medium: 8,
      bad: 16,
    }),
    // new AliasPlugin({ aliases: [ 'input/files', 'input/utils' ] })
  ]
}
