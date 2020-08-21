const path = require("path")
const HtmlWebPackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
module.exports = {
	entry: path.resolve(__dirname, "./main.js"),
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "./dist")
	},

	devtool: process.env.NODE_ENV === "production" ? "eval" : "source-map",
	devServer: {
		contentBase: path.resolve(__dirname, "./dist")
	},
	plugins: [
		new HtmlWebPackPlugin({template: "./index.html"}),
		 new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test:/\.(png|svg|jpeg|jpg|gif)$/,
				use:[
					{
						loader:'url-loader',
						options: {
							limit: 1000,
							name: 'img/[name].[hash:7].[ext]'
						}
					}
				]
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
				options: {
					// Disables attributes processing
					attributes: {
						list: [
							{
								tag: 'img',
								attribute: 'src',
								type: 'src',
							}
						]
					},
				},
			}
		]
	}
}
