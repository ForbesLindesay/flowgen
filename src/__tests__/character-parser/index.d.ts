export declare enum StackElement {
    LINE_COMMENT = 0,
    BLOCK_COMMENT = 1,
    SINGLE_QUOTE = 2,
    DOUBLE_QUOTE = 3,
    TEMPLATE_QUOTE = 4,
    REGEXP = 5,
    ROUND_BRACKET = 6,
    CURLY_BRACKET = 7,
    SQUARE_BRACKET = 8,
}
export declare class State {
    stack: Array<StackElement>;
    regexpStart: boolean;
    escaped: boolean;
    hasDollar: boolean;
    src: string;
    history: string;
    lastChar: string;
    current(): StackElement;
    isString(): boolean;
    isComment(): boolean;
    isNesting(opts?: {
        readonly ignoreLineComment?: boolean;
    }): boolean;
}
export declare function defaultState(): State;
export declare function parse(src: string, state?: State, options?: {
    readonly start?: number;
    readonly end?: number;
}): State;
export default parse;
export declare function parseUntil(src: string, delimiter: string, options?: {
    readonly start?: number;
    readonly end?: number;
    readonly ignoreLineComment?: boolean;
}): {
    start: number;
    end: number;
    src: string;
};
export declare function parseChar(character: string, state?: State): State;
export declare function isPunctuator(c: string): boolean;
export declare function isKeyword(id: string): boolean;
