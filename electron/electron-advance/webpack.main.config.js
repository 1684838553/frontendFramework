const path = require('path');
const rules = require('./webpack.rules');

module.exports = {
  entry: './src/main/main.ts',
  node: {
    __dirname: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'src/main'), 'node_modules'],
  },
  module: {
    rules,
  },
};
