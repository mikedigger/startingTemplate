// const purgecss = require('@fullhuman/postcss-purgecss');
// const combineDuplicatedSelectors = require('postcss-combine-duplicated-selectors');
// const combineMediaQuery = require('postcss-combine-media-query');
// const uncss = require('postcss-uncss');

// module.exports = {
// 	plugins: [
// 		purgecss({
// 			content: ['./src/**/*.js', './src/**/*.pug'],
// 			css: ['./src/**/*.css'],
// 			fontFace: true,
// 			keyframes: true,
// 			variables: true,
// 			rejected: true,
// 			safelist: [/^is/, /active$/, /fixed$/, /.map$/, /^[class]/, /show/, /team/]
// 		}),
// 		// uncss({
// 		// 	html: ['./dist/*.html'],
// 		// 	ignore: [/^is/, /active$/, /fixed$/, /.map$/, /^[class]/, /show/, /team/]
// 		// }),
// 		combineMediaQuery,
// 		combineDuplicatedSelectors({
// 			removeDuplicatedProperties: true,
// 			removeDuplicatedValues: true,
// 		}),
// 		require('autoprefixer'),
// 		require('postcss-browser-reporter'),
// 		require('postcss-flexbugs-fixes'),
// 	],
// };
