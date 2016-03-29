const path = require('path');
const karmaConfigPath = path.join(__dirname, 'karma.conf.js');

const e2eWebpackConfig = require('./webpack.config.js').e2eNpmPackage;

module.exports = (config) => require(karmaConfigPath)(config, e2eWebpackConfig);
