const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack');
const path = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { extendDefaultPlugins } = require('svgo');

const glob = require('glob');
const PATHS = {
	src: path.join(__dirname, '../src')
}

module.exports = merge(common, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].bundle.js',
		assetModuleFilename: '[path][name][ext]',
	},
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin({
				sourceMap: true,
				parallel: true,
			}),
		],
	},
	plugins: [

		new webpack.SourceMapDevToolPlugin({
			test: [/\.js$/, /\.css$/],
			filename: '[file].map',
			module: true,
		}),
		// new PurgeCSSPlugin({
		// 	paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
		// 	safelist: [/^is/, /active$/, /fixed$/, /.map$/, /^[class]/, /show/, /team/],
		// 	rejected: true,
		// }),
		new ImageMinimizerPlugin({
			minimizerOptions: {
				// Lossless optimization with custom option
				// Feel free to experiment with options for better result for you
				plugins: [
					["imagemin-pngquant", {quality: [0.7, 0.9]}],
					["imagemin-mozjpeg", { progressive: true, quality: 70 }],
					["gifsicle", { interlaced: true }],
					// lossless
					// ["jpegtran", { progressive: true }],
					// ["optipng", { optimizationLevel: 5 }],
					// Svgo configuration here https://github.com/svg/svgo#configuration
					[
						"svgo",
						{
							plugins: [
								// 'preset-default',
								// or
								{
									name: 'preset-default',
									floatPrecision: 4,
									overrides: {
										convertPathData: {
											applyTransforms: false
										}
									}
								}
							],
						},
					],
				],
			},
		}),
	],

});
