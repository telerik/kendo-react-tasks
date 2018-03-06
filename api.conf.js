const inheritanceMessage = 'Subclass of [React.Component](https://reactjs.org/docs/react-component.html).';
const componentRegExp = new RegExp('^(Pure)?Component$');
const reactMembers = [ 'context', 'refs', 'state', 'forceUpdate', 'setState',
    'componentDidCatch', 'componentDidMount', 'componentDidUpdate', 'componentWillMount', 'render',
    'componentWillReceiveProps', 'componentWillUnmount', 'componentWillUpdate', 'shouldComponentUpdate' ];

function isInheritedMember(member) {
    return member.inheritedFrom &&
        reactMembers.some(function(name) {
            return member.name === name &&
                (new RegExp("^Component(Lifecycle)?\." + name + "$").test(member.inheritedFrom.name));
        });
}

function isComponent(member) {
    return member.kindString === "Class" &&
        (member.extendedTypes || []).some(c => componentRegExp.test(c.name));
}

function toReactComponentModel(model) {
    model.kind = 'component';
    model.platform = 'react';

    model.comment = model.comment || {};
    model.comment.shortText = inheritanceMessage +
        (model.comment.shortText ? '\n\n' + model.comment.shortText : '');

    const children = model.children;
    for (let i = children.length - 1; i >= 0; i--) {
        if (isInheritedMember(children[i])) {
            children.splice(i, 1);
        }
    }
}

module.exports = {
    warningsAsErrors: false,
    platformSpecific: true,
    isPlatformComponent: isComponent,
    toPlatformComponentModel: toReactComponentModel
};
