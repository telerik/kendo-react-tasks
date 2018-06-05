const inheritanceMessage = 'A subclass of [React.Component](https://reactjs.org/docs/react-component.html).';
const sfcMessage = 'A [Stateless Functional Component](https://reactjs.org/docs/components-and-props.html#functional-and-class-components).';
const toComment = (model) => ({ shortText: `The props of the ${model.name} Component.` });
const componentRegExp = new RegExp('^(Pure)?Component$');
const reactMembers = [ 'context', 'refs', 'state', 'forceUpdate', 'setState', 'render' ];
const lifecycleRegExp = new RegExp("^(DeprecatedLifecycle\.|NewLifecycle\.|ComponentLifecycle\.)");

function isInheritedMember(member) {
    if (member.inheritedFrom === undefined) {
        return false;
    }

    const isLifeCycle = lifecycleRegExp.test(member.inheritedFrom.name);
    const isReactMember = (name) => (member.name === name && (new RegExp("^Component\." + name + "$").test(member.inheritedFrom.name)));

    return (isLifeCycle || reactMembers.some(isReactMember));
}

function isClassComponents(member) {
    return member.kindString === "Class" &&
        (member.extendedTypes || []).some(c => componentRegExp.test(c.name));
}

const isSFComponent = (member) => {
    if (member.kindString === 'Function') {
        const [ signature ] = member.signatures;
        const { parameters } = signature;

        /* We are looking for (props, context) type of SFComponents */
        if (parameters.length > 0
            && parameters.length < 2
            && parameters[0].name === 'props') {
            return true;
        }
    }

    return false;
};

const isComponent = (member) => (isClassComponents(member) || isSFComponent(member));

const fromClassComponent = (model) => {
    model.comment = model.comment || {};
    model.comment.shortText = inheritanceMessage +
        (model.comment.shortText ? '\n\n' + model.comment.shortText : '');

    const children = model.children;

    for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        if (isInheritedMember(child)) {
            children.splice(i, 1);
        } else if (child.name === 'props' && !child.comment) {
            child.comment = toComment(model);
        }
    }
};

const fromSFComponent = (model) => {
    model.comment = model.comment || {};
    model.comment.shortText = sfcMessage +
        (model.comment.shortText ? '\n\n' + model.comment.shortText : '');

    const children = model.children = [];
    /* Looking for the first signature, this should be the SFComponent */
    const [ signature ] = model.signatures;
    const { parameters } = signature;

    for (let i = parameters.length - 1; i >= 0; i--) {
        const child = parameters[i];

        if (child.name === 'props') {
            child.comment = toComment(model);
            children.push(child);
        }
    }
};

const toReactComponentModel = (model) => {
    model.kind = 'component';
    model.platform = 'react';

    if (model.children instanceof Array) {
        fromClassComponent(model);
    } else if (model.signatures instanceof Array) {
        fromSFComponent(model);
    }
};

module.exports = {
    warningsAsErrors: false,
    platformSpecific: true,
    isPlatformComponent: isComponent,
    toPlatformComponentModel: toReactComponentModel
};
