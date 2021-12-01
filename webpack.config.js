const path = require('path');
const webpack = require('webpack');
const { SourceMapDevToolPlugin } = require('webpack');
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPugPlugin = require('html-webpack-pug-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// ---------------------
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { extendDefaultPlugins } = require('svgo');
// ---------------------

module.exports = {
	watchOptions: {
		ignored: /node_modules/,
	},
	context: path.resolve(__dirname, 'src'), // папка де зберігаються ассети
	mode: 'development',
	entry: {
		main: './index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		assetModuleFilename: '[path][name][ext]',
	},
	// !
	// optimization: {
	// 	minimize: true,
	// 	minimizer: [
	// 		new CssMinimizerPlugin({
	// 			sourceMap: true,
	// 			parallel: true,
	// 		}),
	// 	],
	// },
	devtool: false,
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/pug/index.pug'),
			chunks: ['index'],
			filename: 'index.html',
			minify: {
				collapseWhitespace: isProd,
			},
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].bundle.css',
		}),
		new HTMLWebpackPugPlugin(),
		new webpack.SourceMapDevToolPlugin({
			test: [/\.js$/, /\.css$/],
			filename: '[file].map',
			module: true,
		}),
		new webpack.HotModuleReplacementPlugin({}),
	],
	devServer: {
		static: path.join(__dirname, './src'),
		firewall: false,
		port: 7000,
		host: '127.0.0.1',
		// multiple pages
		// openPage: ['index.html', 'page2.html']
		openPage: ['index.html']
	},

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
