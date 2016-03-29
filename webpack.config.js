const commonTasks = require('@telerik/kendo-common-tasks');
const path = require('path');

const sourceExtensions = [ '.jsx' ];
const nodeModulesPath = path.join(__dirname, 'node_modules');

const resolve = commonTasks.resolveConfig(sourceExtensions, nodeModulesPath);

const packageInfo = require(path.join(process.cwd(), 'package.json'));

const babelLoader = {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: require.resolve('babel-loader'),
    plugins: [
        require.resolve('babel-plugin-add-module-exports')
    ],
    query: {
        presets: [
            require.resolve('babel-preset-react'),
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-stage-1') // Note: stage-1 should be after es2015 in order to work
        ]
    }
};

module.exports = {
    CDN: {
        resolve,

        output: { libraryTarget: 'umd' },

        externals: { "react": "React", "react-dom": "ReactDOM" },

        plugins: [
            commonTasks.extractCssPlugin(),
            commonTasks.uglifyJsPlugin()
        ],

        module: {
            loaders: [
                babelLoader,
                commonTasks.CDNSassLoader
            ].concat(commonTasks.resourceLoaders)
        }
    }, // CDN

    npmPackage: {
        resolve,

        output: { libraryTarget: 'commonjs2' },

        externals: [ 'react', 'react-dom', 'react-addons-css-transition-group', /^\.\// ],

        plugins: [ commonTasks.extractCssPlugin() ],

        module: {
            loaders: [
                babelLoader,
                commonTasks.npmPackageSassLoader
            ].concat(commonTasks.resourceLoaders)
        }
    }, // npmPackage

    dev: commonTasks.webpackDevConfig({
        resolve,
        loaders: [ babelLoader ],
        entries: 'examples/*.jsx'
    }), // dev

    test: {
        resolve: Object.assign({}, resolve, { alias: {
            "windowStub": require.resolve("./window-stub.js"),
            "documentStub": require.resolve("./document-stub.js")
        } }),

        externals: {
            'react/lib/ExecutionEnvironment': true,
            "cheerio": "global"
        },

        plugins: [
            // skin deep needs this
            // https://github.com/glenjamin/skin-deep#errors-when-bundling
            new commonTasks.webpack.IgnorePlugin(/ReactContext/),
            new commonTasks.webpack.ProvidePlugin({
                "window": "windowStub",
                "document": "documentStub"
            })
        ],

        module: {
            loaders: [
                babelLoader,
                commonTasks.inlineSassLoader,
                { test: /\.(ttf|eot|svg|woff|woff2|jpe?g|png|gif|svg)$/i, loader: require.resolve('./stub-loader.js') }
            ]
        }
    }, // test

    e2e: {
        resolve: {
            cache: false,
            fallback: resolve.fallback,
            alias: {
                "./e2e": process.cwd() + "/e2e",
                "e2e-utils": require.resolve("./e2e-utils.js"),
                [packageInfo.name]: '../src/main'
            },
            extensions: [ '', '.jsx', '.js', '.json', '.scss' ]
        },
        devtool: 'inline-source-map',
        module: {
            preLoaders: [
                {
                    test: /\.js$/,
                    loader: require.resolve("source-map-loader")
                }
            ],
            loaders: [
                babelLoader,
                { test: /\.json$/, loader: require.resolve('json-loader') },
                { test: /\.(ttf|eot|svg|woff|woff2|jpe?g|png|gif|svg)$/i, loader: require.resolve('./stub-loader.js') },
                commonTasks.inlineSassLoader
            ]
        },
        stats: { colors: true, reasons: true },
        debug: false,
        plugins: [
            new commonTasks.webpack.ContextReplacementPlugin(/\.\/e2e/, process.cwd() + '/e2e')
        ]
    },

    e2eNpmPackage: {
        resolve: {
            cache: false,
            fallback: resolve.fallback,
            alias: {
                "./e2e": process.cwd() + "/e2e",
                "e2e-utils": require.resolve("./e2e-utils.js"),
                [packageInfo.name]: '../src/main'
            },
            extensions: [ '', '.jsx', '.js', '.json', '.scss' ]
        },
        devtool: 'inline-source-map',
        module: {
            preLoaders: [
                {
                    test: /\.js$/,
                    loader: require.resolve("source-map-loader")
                }
            ],
            loaders: [
                babelLoader,
                { test: /\.json$/, loader: require.resolve('json-loader') },
                { test: /\.(ttf|eot|svg|woff|woff2|jpe?g|png|gif|svg)$/i, loader: require.resolve('./stub-loader.js') },
                commonTasks.inlineSassLoader
            ]
        },
        stats: { colors: true, reasons: true },
        debug: false,
        plugins: [
            new commonTasks.webpack.ContextReplacementPlugin(/\.\/e2e/, process.cwd() + '/e2e')
        ]
    }


}; // module.exports
