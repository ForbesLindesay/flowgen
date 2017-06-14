import * as tt from 'typescript';
import Scope from './Scope';
import transformBindingElement from './transformBindingElement';

export default function transformObjectBindingPattern(pattern: tt.ObjectBindingPattern, scope: Scope): string {
  return `{${pattern.elements.map(e => transformBindingElement(e, scope)).join(',')}}`
}