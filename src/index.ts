import { tokTypes as tt } from 'acorn';
import {TokenType} from "acorn/dist/acorn";

const DecoratorKey = 'Decorator';
const at = new TokenType('@', { beforeExpr: true});

export default function decorator(Parser: any) {
  return class extends Parser {
    decorators: any[] = [];

    parseStatement(context: any, topLevel: any, exports: any) {
      if (this.type === at) {
        const node = this.startNode();
        this.next();
        node.expression = this.parseMaybeAssign();
        const finishedNode = this.finishNode(node, DecoratorKey);

        this.decorators.push(finishedNode);
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

    getTokenFromCode(code: number) {
      if (code === 64) {
        ++this.pos;
        return this.finishToken(at);
      }
      return super.getTokenFromCode(code);
    }
  }
}
