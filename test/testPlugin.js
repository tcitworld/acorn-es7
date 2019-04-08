import * as acorn from 'acorn';
import decorator from '../src/index';

const Parser = acorn.Parser.extend(decorator);

export default function testPlugin(code) {
    let result;
    try {
        result = Parser.parse(code, {
            ecmaVersion: 10,
            locations: true,
            ranges: true,
            sourceType: 'module',
        });
    } catch (e) {
        result = {
            error: e,
        };
    }

    return result;
}
