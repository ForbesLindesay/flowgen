import * as tt from 'typescript';
import Scope from './Scope';
import transformArrayBindingElement from './transformArrayBindingElement';

export default function transformArrayBindingPattern(pattern: tt.ArrayBindingPattern, scope: Scope): string {
  return `[${pattern.elements.map(e => transformArrayBindingElement(e, scope)).join(',')}]`;
}