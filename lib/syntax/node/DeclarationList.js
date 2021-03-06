const {
    WhiteSpace,
    Comment,
    Semicolon
} = require('../../tokenizer/types');

function consumeRaw(startToken) {
    return this.Raw(startToken, this.consumeUntilSemicolonIncluded, true);
}

module.exports = {
    name: 'DeclarationList',
    structure: {
        children: [[
            'Declaration'
        ]]
    },
    parse: function() {
        const children = this.createList();

        scan:
        while (!this.eof) {
            switch (this.tokenType) {
                case WhiteSpace:
                case Comment:
                case Semicolon:
                    this.next();
                    break;

                default:
                    children.push(this.parseWithFallback(this.Declaration, consumeRaw));
            }
        }

        return {
            type: 'DeclarationList',
            loc: this.getLocationFromList(children),
            children
        };
    },
    generate: function(node) {
        this.children(node, prev => {
            if (prev.type === 'Declaration') {
                this.token(Semicolon, ';');
            }
        });
    }
};
