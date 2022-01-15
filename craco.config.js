/* eslint-disable */
const path = require('path');
const cracoWorkboxPlugin = require('craco-workbox');
const cracoAlias = require('craco-alias');
const sassResourcesLoader = require('craco-sass-resources-loader');
const imageOptimizer = require('./new-craco-image-optimizer-plugin');

const CSS_MODULE_LOCAL_IDENT_NAME = '[name]__[local]___[hash:base64:5]';
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
	style: {
		modules: {
			localIdentName: CSS_MODULE_LOCAL_IDENT_NAME,
		},
		css: {
			loaderOptions: {
				modules: {
					exportLocalsConvention: 'camelCase',
				},
			},
		},
		postcss: {
			postcssOptions: {
				mode: 'extends',
				env: {
					autoprefixer: {
						cascade: true,
					},
					stage: 3,
					features: {
						'nesting-rules': true,
					},
				},
				plugins: [
					// purgecss({
					// 	content: ['./src/**/*.jsx', './src/**/*.js'],
					// }),
					require('cssnano')({
						preset: 'default',
					}),
				],
			},
		},
	},
	devServer: {
		port: 3001,
	},
	webpack: {
		configure: (webpackConfig, { env, paths }) => {
			// cra uses filenames like foo.module.css and foo.module.scss determine if
			// a style file should be treated as module or not.
			// since we only use modules we override this behaviour here.
			// every css and scss file gets treated as module
			webpackConfig.module.rules = webpackConfig.module.rules.map((rule) => {
				if (!Array.isArray(rule.oneOf)) return rule;

				rule.oneOf = rule.oneOf
					.map((loader) => {
						// remove non module loaders
						if (String(loader.test) === String(cssRegex)) {
							return null;
						}

						// match non .module.css files with the configuration for css modules
						if (String(loader.test) === String(cssModuleRegex))
							loader.test = cssRegex;

						// match non .module.scss files with the configuration for scss modules
						if (String(loader.test) === String(sassModuleRegex))
							loader.test = sassRegex;
						return loader;
					})
					.filter(Boolean);

				return rule;
			});

			return webpackConfig;
		},
	},
	babel: {
		plugins: [
			[
				'babel-plugin-react-css-modules',
				{
					generateScopedName: CSS_MODULE_LOCAL_IDENT_NAME,
					attributeNames: { activeStyleName: 'activeClassName' },
				},
			],
		],
	},
	plugins: [
		// {
		// 	plugin: imageOptimizer,
		// 	// image-webpack-plugin options
		// 	options: {
		// 		mozjpeg: {
		// 			progressive: true,
		// 			quality: 65,
		// 		},
		// 		// optipng.enabled: false will disable optipng
		// 		optipng: {
		// 			enabled: false,
		// 		},
		// 		pngquant: {
		// 			quality: [0.65, 0.9],
		// 			speed: 4,
		// 		},
		// 		gifsicle: {
		// 			interlaced: false,
		// 		},
		// 		// the webp option will enable WEBP
		// 		webp: {
		// 			quality: 75,
		// 		},
		// 	},
		// },
		{
			plugin: cracoWorkboxPlugin,
		},
		{
			plugin: sassResourcesLoader,
			options: {
				resources: [
					'./src/sass/variables/index.scss',
					'./src/sass/helpers/index.scss',
				],
			},
		},
		{
			plugin: cracoAlias,
			options: {
				source: 'options',
				baseUrl: './',
				aliases: {
					app: path.resolve(__dirname, 'src'),
					public: path.resolve(__dirname, 'public'),
					components: './src/components',
					modules: './src/modules',
					utils: './src/utils',
					store: './src/store',
					images: './src/assets/images',
					icons: './src/assets/icons',
					assets: './src/assets',
					apis: './src/apis',
					actions: './src/actions',
					reducers: './src/reducers',
					constants: './src/constants',
					sass: './src/sass',
					stringConstants: './src/stringConstants',
					testUtils: './src/testUtils',
				},
			},
		},
	],
};
