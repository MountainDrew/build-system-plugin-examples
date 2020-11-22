const path = require('path');

// when building your own change 'complete' to 'incomplete'
const AliasPlugin = require('./plugins/alias.complete.js');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: './input/app1.js',
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: '[name].js'
  },
  plugins: [
    new AliasPlugin({
      aliases: {
        'files': 'input/files',
        'utils': 'input/utils'
      }
    })
  ]
}
