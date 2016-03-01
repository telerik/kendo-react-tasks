import $ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

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

export { $, expect, withRoot };
