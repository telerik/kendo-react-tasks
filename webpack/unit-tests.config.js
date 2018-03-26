'use strict';

module.exports = {
    // Development mode should be an option too.
    mode: 'production',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [{
                loader: require.resolve('ts-loader'),
                options: { transpileOnly: false }
            }]
        }]
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
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
