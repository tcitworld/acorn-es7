import { expect } from 'chai';
import { describe } from 'mocha';
import { parse } from '@babel/parser';

import testPlugin from './testPlugin';

describe('acorn-es7', () => {
    it('works', () => {
        console.log('hello');
        const code = `
@Component({
  prop: "toto"
})
export class Coucou {}
`;
        const acornAst = testPlugin(code);
        console.log(JSON.stringify(acornAst));
        const babelAst = parse(code, {
                plugins: ['decorators-legacy', 'estree'],
                sourceType: "module"
            });
        console.log(JSON.stringify(babelAst));
        expect(babelAst.program).to.deep.equal(acornAst);
    })
});
