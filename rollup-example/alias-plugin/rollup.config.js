import aliasPlugin from './plugin/alias-plugin.complete';

export default {
  input: 'input/app1.js',
  output: {
    file: './output/main.js',
    format: 'cjs'
  },
  plugins: [aliasPlugin({
    aliases: {
      'files': 'input/files',
      'utils': 'input/utils'
    }
  })]
};
