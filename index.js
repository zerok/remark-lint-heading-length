const rule = require('unified-lint-rule');
const wordcount = require('wordcount');
const visit = require('unist-util-visit');

module.exports = rule('remark-lint:heading-length', (ast, file, options) => {
    const {min, max} = Object.assign({min: 2, max: 10}, options);
    visit(ast, 'heading', (node) => {
        const text = node.children
        .filter(child => child.type === 'text')
        .map(child => child.value)
        .reduce((result, child) => {
            return `${result} ${child}`;
        }, '').trim();
        const count = wordcount(text);

        if (count > max || count < min) {
            file.fail(`Heading "${text}" should have at least ${min} and at most ${max} words (current length: ${count}).`, node);
        }
    });
});