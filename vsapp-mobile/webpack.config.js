const path = require("path")
const HtmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
	entry: path.resolve(__dirname, "./main.js"),
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "./dist")
	},
	devtool: "source-map",
	devServer: {
		contentBase: path.resolve(__dirname, "./dist")
	},
	plugins: [
		new HtmlWebPackPlugin({template: "./index.html"})
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
						loader:'file-loader'
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
