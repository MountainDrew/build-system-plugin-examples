const { resolve } = require('path');
const fs = require('fs');
const chalk = require('chalk');

module.exports = class BundleSizePlugin {
  constructor(opts = {}) {
    this.opts = {
      good: 30,
      medium: 100,
      bad: 200,
      ...opts
    };
  }

  apply(compiler) {
    compiler.hooks.done.tap("BundleSizePlugin", (stats) => {
      const { entry } = stats.compilation.options;
      const { path, filename } = stats.compilation.options.output;

      const outFiles = Object.keys(stats.compilation.assets);

      if(outFiles.length < 1) return;

      console.log('Started: ', chalk.blueBright('BundleSizePlugin'), `${outFiles.length} file(s)`);
      outFiles.map(file => this.handleBundle(path, file));
      console.log('Finished: ', chalk.blueBright('BundleSizePlugin'));
    });
  }

  handleBundle (path, file) {
    const bundlePath = resolve(path, file);

    const fileExists = fs.existsSync(bundlePath);
    if(!fileExists) throw new Error('Error in BundleSizePlugin - file not found: ', bundlePath);

    const { size: sizeInBytes } = fs.statSync(bundlePath);
    const fileSizeInKb = parseFloat(sizeInBytes / 1024).toFixed(2);

    this.analyseFileSize(file, fileSizeInKb);
  }

  analyseFileSize (file, fileSizeInKb) {
    if (fileSizeInKb > this.opts.bad) {
      console.error(chalk.redBright(file + ' -- ' + fileSizeInKb + 'KiB'), 'File size exceeded bad limit');
      throw new Error('Above error occured in BundleSizeComplete');
    } else if (fileSizeInKb > this.opts.medium) {
      console.warn(chalk.yellowBright(file + ' -- ' + fileSizeInKb + 'KiB'), 'File size exceeded medium limit');
      return;
    } else if (fileSizeInKb > this.opts.easy) {
      console.log(chalk.yellowBright(file + ' -- ' + fileSizeInKb + 'KiB'), 'File size exceeded good limit');
      return;
    }

    console.error(chalk.greenBright(file + ' -- ' + fileSizeInKb + 'KiB'), 'Congrats! File size of is still in the good limit');
  }
}
