import { tokTypes as tt } from 'acorn';

export const DecoratorKey = 'Decorator';

function parseDecorator() {
  const node = this.startNode();
  this.next();
  node.expression = this.parseMaybeAssign();
  return this.finishNode(node, DecoratorKey);
}

export default function decorator(Parser) {

  return class extends Parser {
    decorators = [];

    parseStatement(context, topLevel, exports) {
      if (this.type === tt.at) {
        decorators.push(parseDecorator.call(this));
      }
      if (this.type === tt._class) {
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
        return this.finishToken(tt.at);
      }
      return super.getTokenFromCode(code);
    }
  }
}
