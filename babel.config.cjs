module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { esmodules: true } }], // It's the name of the lib you installed
    ['@babel/preset-react', { runtime: 'automatic' }], // It's the name of the lib you installed
    '@babel/preset-typescript',
  ],
  plugins: [
    function () {
      return {
        visitor: {
          MetaProperty(path) {
            path.replaceWithSourceString('process');
          },
        },
      };
    },
  ],
};
