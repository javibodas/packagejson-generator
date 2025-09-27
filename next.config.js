import { patchWebpackConfig } from 'next-global-css'
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'

export default {
	// Disable server-side rendering for dynamic pages that don't need it
	experimental: {
		// Remove if not needed for other features
	},
	webpack: (config, options ) => {
		// allow global CSS to be imported from within node_modules
		patchWebpackConfig(config, options)
		
		if(!options.isServer) {
			config.plugins.push(
				new MonacoWebpackPlugin({
					languages: ['json'],
					filename: 'static/[name].worker.js'
				})
			)
		}

		return config
	}
}