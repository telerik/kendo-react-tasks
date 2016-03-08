/*eslint no-var: 0 */
var $ = require('jquery');
var chai = require('chai');
var chaiJquery = require('chai-jquery');

var expect = chai.expect;

global.jQuery = $;

chai.should();
chai.use(chaiJquery);

function withRoot(closure) {
    return function() {
        var root = $("<div />").appendTo(document.body);

        afterEach(function() {
            root.empty();
        });

        closure(root);
    };
}

module.exports = {
    "$": $,
    "expect": expect,
    "withRoot": withRoot
};

