const List = require('../common/List');

module.exports = function clone(node) {
    const result = {};

    for (const key in node) {
        let value = node[key];

        if (value) {
            if (Array.isArray(value) || value instanceof List) {
                value = value.map(clone);
            } else if (value.constructor === Object) {
                value = clone(value);
            }
        }

        result[key] = value;
    }

    return result;
};
