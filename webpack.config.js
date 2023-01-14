const path = require('path');
const {
  NODE_ENV = 'production',
} = process.env;
module.exports = {
  entry: './src/main.ts',
  module:{
    rules:[{
      test:/\.ts$/,
      use:'ts-loader',
      exclude:/node_modules/
    }]
  },
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js',
    clean: true
  },
  devServer:{
    contentBase:'./dist',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
}
