const commonTasks = require('@telerik/kendo-common-tasks');
const path = require('path');

const sourceExtensions = [ '.tsx', '.ts' ];
const nodeModulesPath = path.join(__dirname, 'node_modules');

const resolve = commonTasks.resolveConfig(sourceExtensions, nodeModulesPath);

const packageInfo = require(path.join(process.cwd(), 'package.json'));

const tsLoader = (compilerOptions, loaderOptions = {}) => ({
    test: /\.tsx?$/,
    exclude: /(node_modules)/,
    loader: require.resolve('ts-loader'),
    query: {
        compilerOptions
    },
    options: Object.assign({
        transpileOnly: true
    }, loaderOptions)
});

const jsonLoader = {
    test: /\.json$/i,
    loader: require.resolve('json-loader')
};

const packageDependencies = () => (
    Object.keys(packageInfo["dependencies"] || {})
        .filter(x => x !== "@progress/kendo-theme-default")
);

module.exports = {
    /* Configuration for package's CDN distribution */
    CDN: commonTasks.webpackThemeConfig({ extract: true }, {
        resolve,

        output: { libraryTarget: 'umd' },

        externals: {
            "react": {
                "root": 'React',
                "commonjs": 'react',
                "commonjs2": 'react',
                "amd": 'react'
            },
            "react-dom": {
                "root": "ReactDOM",
                "commonjs": 'react-dom',
                "commonjs2": 'react-dom',
                "amd": 'react-dom'
            },
            "react-dom/server": {
                "root": "ReactDOMServer",
                "commonjs": 'react-dom/server',
                "commonjs2": 'react-dom/server',
                "amd": 'react-dom/server'
            },
            "react-transition-group": {
                "root": "ReactTransitionGroup",
                "commonjs": 'react-transition-group',
                "commonjs2": 'react-transition-group',
                "amd": 'react-transition-group'
            }
        },
        plugins: [
            commonTasks.uglifyJsPlugin()
        ],

        module: {
            loaders: [
                tsLoader({
                    declaration: false
                }, {
                    transpileOnly: false
                })
            ]
        }
    }),

    /* Configuration for package's SystemJS distribution */
    systemjs: commonTasks.webpackThemeConfig({ extract: true }, {
        resolve,

        stats: { assets: false },

        module: {
            loaders: [ tsLoader({ declaration: false }) ]
        }
    }),

    /* Configuration used for local documentation examples */
    npmPackage: commonTasks.webpackThemeConfig({ extract: true }, {
        resolve,

        output: { libraryTarget: 'commonjs' },

        externals: [
            'react',
            'react-dom',
            'react-transition-group', /^\.\//
        ].concat(packageDependencies()),

        module: {
            preLoaders: [ jsonLoader ],
            loaders: [ tsLoader({ sourceMap: true }) ]
        }
    }),

    /* Configuration used for the local examples */
    dev: commonTasks.webpackDevConfig({
        resolve,
        preLoaders: [ jsonLoader ],
        loaders: [ tsLoader({ sourceMap: true }) ],
        entries: 'examples/**/*.tsx'
    }),

    /* Configuration used for the unit tests */
    test: commonTasks.webpackThemeConfig({ stubResources: true }, {
        resolve: resolve,

        stats: { assets: false },

        //https://github.com/airbnb/enzyme/issues/503#issuecomment-258216960
        externals: {
            'react/addons': true,
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': true,
            'react-addons-test-utils': 'react-dom'
        },

        plugins: [
        ],

        module: {
            loaders: [
                tsLoader(),
                { test: /\.json$/, loader: require.resolve('json-loader') }
            ]
        }
    })
};
