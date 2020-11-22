const path = require('path');

// when building your own change 'complete' to 'incomplete'
const BundleSizePlugin = require('./plugin/bundle-size.complete.js');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    small: './input/small.js',
    medium: './input/medium.js'
  },
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: '[name].js'
  },
  plugins: [
    new BundleSizePlugin({
      good: 4,
      medium: 8,
      bad: 16,
    })
  ]
}
