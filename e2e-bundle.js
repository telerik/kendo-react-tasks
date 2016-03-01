
Error.stackTraceLimit = Infinity;

const e2eContext = require.context('./e2e', true, /(.*)\.jsx$/);
e2eContext.keys().forEach(e2eContext);
