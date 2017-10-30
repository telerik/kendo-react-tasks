/*eslint no-var: 0 */
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
    "withRoot": withRoot
};

