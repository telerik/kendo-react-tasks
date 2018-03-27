'use strict';

module.exports = {
    mode: 'production',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [{
                loader: require.resolve('ts-loader'),
                options: { transpileOnly: false, compilerOptions: { declaration: false } }
            }]
        }]
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts']
    },
    plugins: [
        // webpack-system-register is added dynamically.
    ],
    stats: { assets: false }
};
