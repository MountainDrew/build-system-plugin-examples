/*
An alias will look like this
opts.aliases = [
  'folder1',
  'folder2'
]
*/

const path = require('path');

module.exports = class AliasPlugin {
  static PLUGIN_NAME = 'AliasPlugin';
  constructor(opts) {
    this.opts = opts || {};
    this.opts.aliases = this.opts.aliases || [];
  }

  apply(compiler) {
    if(this.opts.aliases.length < 1) return;

    compiler.hooks.normalModuleFactory.tap(AliasPlugin.PLUGIN_NAME, factory => {
      factory.hooks.resolver.tap(AliasPlugin.PLUGIN_NAME, resolve => {
        return (dep, callback) => {
          this.resolveFileFromAliases(dep, resolve, callback);
        };
      })
    });
  }

  resolveFileFromAliases (dep, resolve, callback) {
    if(!Object.keys(this.opts.aliases).some(alias => dep.request.startsWith(alias))) {
      return resolve(dep, callback);
    }

    const [aliasKey, aliasValue] = Object.entries(this.opts.aliases).find(([key]) => dep.request.startsWith(key))

    const restOfPath = dep.request.slice(
      aliasKey.length + 1,
      dep.request.length
    );

    dep.request = path.resolve(aliasValue, restOfPath);

    resolve(dep, callback);
  }
}
