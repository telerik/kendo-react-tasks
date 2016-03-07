const $ = require('jquery');
const chai = require('chai');
const chaiJquery = require('chai-jquery');

const expect = chai.expect;

global.jQuery = $;

chai.should();
chai.use(chaiJquery);

function withRoot(closure) {
    return () => {
        const root = $("<div />").appendTo(document.body);

        afterEach(() => root.empty());

        closure(root);
    };
}

module.exports = { $, expect, withRoot };

