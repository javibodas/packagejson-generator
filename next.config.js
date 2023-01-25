const withPlugins = require('next-compose-plugins')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const withCSS = require('@zeit/next-css')

module.exports = withPlugins([withCSS], {
	webpack: config => {
		config.module.rules.push({
			test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 100000,
				},
			},
		})
      
		config.plugins.push(
			new MonacoWebpackPlugin({
				languages: ['json'],
				filename: 'static/[name].worker.js'
			})
		)
		return config
	}
})