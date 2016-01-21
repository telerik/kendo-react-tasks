const commonTasks = require('kendo-common-tasks')
const path = require('path')

const sourceExtensions = ['.jsx']
const nodeModulesPath = path.join(__dirname, 'node_modules')

const resolve = commonTasks.resolveConfig(sourceExtensions, nodeModulesPath)

const babelLoader = {
  test: /\.jsx?$/,
  exclude: /(node_modules|bower_components)/,
  loader: require.resolve('babel-loader'),
  query: {
    presets: [
      require.resolve('babel-preset-stage-2'),
      require.resolve('babel-preset-react'),
      require.resolve('babel-preset-es2015')
    ]
  }
}

module.exports = {
  CDN: {
    resolve,

    output: {libraryTarget: 'umd'},

    externals: {"react": "React", "react-dom": "ReactDOM"},

    plugins: [
      commonTasks.extractCssPlugin(),
      commonTasks.uglifyJsPlugin()
    ],

    module: {
      loaders: [babelLoader, commonTasks.CDNSassLoader]
    }
  }, // CDN

  npmPackage: {
    resolve,

    output: {libraryTarget: 'commonjs'},

    externals: ['react', 'react-dom', /^\.\//],

    plugins: [commonTasks.extractCssPlugin()],

    module: {
      loaders: [babelLoader, commonTasks.npmPackageSassLoader]
    }
  }, // npmPackage

  dev: commonTasks.webpackDevConfig({
    resolve,
    loaders: [babelLoader],
    entries: 'examples/*.jsx'
  }), // dev

  test: {
    resolve,

    externals: {
      'react/lib/ExecutionEnvironment': true,
      "cheerio": "global"
    },

    plugins: [
      // skin deep needs this
      // https://github.com/glenjamin/skin-deep#errors-when-bundling
      new commonTasks.webpack.IgnorePlugin(/ReactContext/)
    ],

    module: {
      loaders: [
        babelLoader,
        {test: /\.scss$/, loader: require.resolve('./stub-loader')}
      ]
    }
  } // test

} // module.exports
