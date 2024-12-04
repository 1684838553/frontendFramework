const path = require('path');
const rules = require('./webpack.rules');

const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@': resolve('./src'),
    },
  },
  module: {
    rules,
  },
};
