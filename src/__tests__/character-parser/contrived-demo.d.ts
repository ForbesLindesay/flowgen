import { StackElement } from './index';

export { StackElement as Foo };

declare function getString(element: StackElement): string;
export {getString};

export default StackElement;
