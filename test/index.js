import { expect } from 'chai';
import { describe } from 'mocha';

import testPlugin from './testPlugin';

describe('acorn-es7', () => {
    it('works', () => {
        console.log('hello');
        console.log(testPlugin('@coucou export class Coucou {}'))
    })
});
