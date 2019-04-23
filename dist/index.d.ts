export default function decorator(Parser: any): {
    new (): {
        [x: string]: any;
        decorators: any[];
        parseStatement(context: any, topLevel: any, exports: any): any;
        getTokenFromCode(code: number): any;
    };
    [x: string]: any;
};
