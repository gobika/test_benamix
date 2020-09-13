module.exports = {
	ignore: ["node_modules/bower_components"],
	presets: [
		['@babel/preset-env'
			, {
			"targets": "> 0.25%, not dead"
		}
		]
	],
	plugins: [
		['@babel/plugin-transform-runtime'
			, {
			"corejs": 2,
		}],
	]
};
