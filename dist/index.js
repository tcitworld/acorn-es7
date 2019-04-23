"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const acorn_1 = require("acorn");
const acorn_2 = require("acorn/dist/acorn");
const DecoratorKey = 'Decorator';
const at = new acorn_2.TokenType('@', { beforeExpr: true });
function decorator(Parser) {
    return class extends Parser {
        constructor() {
            super(...arguments);
            this.decorators = [];
        }
        parseStatement(context, topLevel, exports) {
            if (this.type === at) {
                const node = this.startNode();
                this.next();
                node.expression = this.parseMaybeAssign();
                const finishedNode = this.finishNode(node, DecoratorKey);
                this.decorators.push(finishedNode);
            }
            if (this.type === acorn_1.tokTypes._class) {
                const node = super.parseStatement(context, topLevel, exports);
                node.decorators = this.decorators;
                // adjust start of ClassDeclaration with start of the first decorator (helpful for ES7 walk).
                node.start = node.decorators[0].start;
                this.decorators = [];
                return node;
            }
            return super.parseStatement(context, topLevel, exports);
        }
        getTokenFromCode(code) {
            if (code === 64) {
                ++this.pos;
                return this.finishToken(at);
            }
            return super.getTokenFromCode(code);
        }
    };
}
exports.default = decorator;
