const { Component, createElement } = require('react');

class Link extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        if (
            !e.defaultPrevented && e.button === 0 && !this.props.target &&
            !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
        ) {
            e.preventDefault();
            if (this.props.replace) this.props.history.replace(this.props.to);
            else this.props.history.push(this.props.to);
        }
    }
    render() {
        return createElement('a', { href: this.props.to, onClick: this.handleClick }, this.props.children);
    }
}

function link(model, href, children) {
    return createElement(Link, { to: href, key: href }, children)
}

module.exports = link;
