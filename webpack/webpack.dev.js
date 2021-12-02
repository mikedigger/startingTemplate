const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = merge(common, {
	mode: 'development',
	devtool: false,
	plugins: [
		new webpack.HotModuleReplacementPlugin({}),
		new webpack.SourceMapDevToolPlugin({
			test: [/\.js$/, /\.css$/],
			filename: '[file].map',
			module: true,
		}),
		new CleanWebpackPlugin(),
	],
	devServer: {
		static: path.join(__dirname, '../src'),
		firewall: false,
		port: 7000,
		host: '127.0.0.1',
		// multiple pages
		// openPage: ['index.html', 'page2.html']
	},

});
