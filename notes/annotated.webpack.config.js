
const webpack = require('webpack');
const path = require('path');
const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin, ContextReplacementPlugin } = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

//consts
const projectRoot       = process.cwd();
const node_modules_dir = path.resolve(__dirname, "/node_modules");

console.log(`node_modules_dir: ${node_modules_dir}`);

module.exports = {
  mode: "development",        //Uses different optimization techniques depending on mode ( production, development, none )
  devtool: 'source-map',
  entry: "./src/index.ts",    //The place where webpack starts in order to build its dependency graph. Can be a string or an array consisting of multiple entry points
  output: {                   //Where to put the built bundle. Can be a string, object, or array
    filename: "./dist/bundle.js"
  },
  resolve: {                  //Tells webpack where to look for X type of files
    extensions: [".ts", ".js", ".json"],
    modules: [
      "./src",
      node_modules_dir
    ]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" }      //module.rules define loaders. When the test property mactches an asset, it then uses the specified loader.
    ]
  },
  plugins: [                                          //Loaders handle loading files and plugins handle broader things 
    new NoEmitOnErrorsPlugin(),                        //Like bundle optimzation, injecting env vars, asset management, ect..
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
