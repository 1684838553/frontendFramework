const rules = require('./webpack.rules');

module.exports = {
  entry: './src/main/main.ts',
  node: {
    __dirname: true,
  },
  module: {
    rules,
  },
};
