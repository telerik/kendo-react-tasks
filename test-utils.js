const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

function withRoot(closure) {
    return function() {
        const root = document.createElement('div');

        document.body.appendChild(root);

        afterEach(function() {
            while (root.firstChild) {
                root.removeChild(root.firstChild);
            }
        });

        closure(root);
    };
}

module.exports = {
    Enzyme,
    withRoot
};
