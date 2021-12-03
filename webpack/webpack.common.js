const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const { SourceMapDevToolPlugin } = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPugPlugin = require('html-webpack-pug-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	watchOptions: {
		ignored: /node_modules/,
	},
	context: path.resolve(__dirname, '../src'),
	entry: {
		main: './index.js',
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].bundle.js',
		assetModuleFilename: '[path][name][ext]',
		// clean: true,
	},
	devtool: false,
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/pug/index.pug'),
			inject: true,
			filename: 'index.html',
		}),

		new MiniCssExtractPlugin({
			filename: '[name].bundle.css',
		}),
		new HTMLWebpackPugPlugin(),
	],

	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},

			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				type: 'asset/resource',
			},

			{
				test: /\.(scss|css)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
			},
			{
				test: /\.pug$/,
				use: [
					'html-loader',
					{
						loader: 'pug-html-loader',
						options: {
							pretty: true,
						},
					},
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
				use: ['babel-loader'],
			},
		],
	},
};
