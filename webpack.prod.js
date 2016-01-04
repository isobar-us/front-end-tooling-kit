'use strict';

let webpack = require('webpack');
let mergeWebpackConfig = require('webpack-config-merger');
let webpackBaseConfig = require('./webpack.base.js');

module.exports = mergeWebpackConfig(webpackBaseConfig, {
  //devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }})
  ]
});