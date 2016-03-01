const noop = function() { };

const elementStub = { appendChild: noop };

module.exports = {
    createElement: () => elementStub,
    getElementsByTagName: () => [ elementStub ],
    appendChild: noop,
    createTextNode: noop
};
