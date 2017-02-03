var List = require('../../utils/list');
var TYPE = require('../../scanner').TYPE;

var WHITESPACE = TYPE.Whitespace;
var COMMENT = TYPE.Comment;
var SEMICOLON = TYPE.Semicolon;

module.exports = function DeclarationList() {
    var start = this.scanner.tokenStart;
    var children = new List();

    scan:
    while (!this.scanner.eof) {
        switch (this.scanner.tokenType) {
            case WHITESPACE:
            case COMMENT:
            case SEMICOLON:
                this.scanner.next();
                break;

            default:
                children.appendData(this.Declaration());
        }
    }

    return {
        type: 'DeclarationList',
        loc: this.getLocation(start, this.scanner.tokenStart),
        children: children
    };
};