
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin, ContextReplacementPlugin } = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

const WebpackShellPlugin = require('webpack-shell-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

//consts
const projectRoot       = process.cwd();
const node_modules_dir  = path.join(projectRoot, "/node_modules");
const dist_path = path.join(projectRoot, "/dist"); 

// console.log(`dist_path: ${dist_path}`);

// webpack is cranky about some packages using a soon to be deprecated API. shhhhhhh
process.noDeprecation = true;

var nodeModules = {};
fs.readdirSync(`${process.cwd()}/node_modules`)
.filter(function(x) {
	return ['.bin'].indexOf(x) === -1;
})
.forEach(function(mod) {
	nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
  mode: "development",
  devtool: 'source-map',
  entry: "./src/index.ts",
  externals: nodeModules,
  resolveLoader: {
    modules: [
      'node_modules',
      'loaders'
    ]
  },
  output: {
    "path": dist_path,
    "filename": "app.bundle.js"
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    modules: [
      "./src",
      node_modules_dir
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
    }),
    new NodemonPlugin()
    // new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildEnd:[`nodemon --inspect=0.0.0.0:9229 --watch ${dist_path}/dist/app.bundle.js -V -L`]})
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
    'setImmediate': false,
    'dns': 'empty', 
    'connect-mongo': true
	},
};
