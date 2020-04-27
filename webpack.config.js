
const webpack = require('webpack');
const path = require('path');
const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin, ContextReplacementPlugin } = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

//consts
const projectRoot = process.cwd();

// webpack is cranky about some packages using a soon to be deprecated API. shhhhhhh
process.noDeprecation = true;

module.exports = {
  mode: "development",
  devtool: 'source-map',
  entry: "./src/index.ts",
  output: {
    filename: "./dist/bundle.js"
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    modules: [
      "./src",
      "./node_modules"
    ]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
    ]
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new ContextReplacementPlugin(/.*/),
    new ProgressPlugin(),
    new CircularDependencyPlugin({
			'exclude': /(\\|\/)node_modules(\\|\/)/,
			'failOnError': false,
			'onDetected': false,
			'cwd': projectRoot
		})
  ],
  'node': {
		'fs': 'empty',
		'global': true,
		'crypto': 'empty',
		'tls': 'empty',
		'net': 'empty',
		'process': true,
		'module': false,
		'clearImmediate': false,
		'setImmediate': false
	},
};
