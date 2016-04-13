const commonTasks = require('@telerik/kendo-common-tasks');

module.exports = (config) =>
    commonTasks.karmaConfig(config, require('./webpack.config.js').e2e, 'e2e-bundle.js');
