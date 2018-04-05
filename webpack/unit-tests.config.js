'use strict';

module.exports = {
    mode: 'development',
    module: {
        rules: [ {
            test: /\.tsx?$/,
            use: [ {
                loader: require.resolve('ts-loader'),
                options: { }
            } ]
        } ]
    },
    resolve: {
        extensions: [ '.js', '.tsx', '.ts' ]
    },
    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react-addons-test-utils': 'react-dom'
    },
    plugins: [
    ]
};
