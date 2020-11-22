import path from 'path';

export default function aliasPlugin({ aliases }) {
  return {
    name: 'alias-plugin',
    async resolveId(id, importer) {
      if(Object.keys(aliases).every((alias) => !id.startsWith(alias))) return;

      const matchedAlias = Object.entries(aliases).find(([key]) => id.startsWith(key));

      if(!matchedAlias) {
        throw new Error('error occured when trying to resolve alias');
        // or return;
      }

      const [aliasKey, aliasValue] = matchedAlias;

      const restOfPath = id.slice(
        aliasKey.length + 1,
        id.length
      );

      const resolvedPath = path.resolve(aliasValue, restOfPath);

      const result = await this.resolve(resolvedPath, importer)

      return result;
    }
  }
}
