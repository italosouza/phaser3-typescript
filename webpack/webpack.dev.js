const merge = require('webpack-merge')
const common = require('./webpack.common')

const dev = {
  mode: 'development',
  devtool: 'eval-source-map'
  // devServer: {
  //   open: true,
  //   noInfo: true
  // }
}

module.exports = merge(common, dev)
