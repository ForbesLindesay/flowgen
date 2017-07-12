import * as tt from 'typescript';
import Scope from './Scope';
import transformBindingElement from './transformBindingElement';

export default function transformObjectBindingPattern(pattern: tt.ObjectBindingPattern, scope: Scope): string {
  // flow does not need a name for these as the actual function implementations have already been discarded
  return 'obj';
}