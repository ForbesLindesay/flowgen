import * as tt from 'typescript';
import Scope from './Scope';
import transformBindingName from './transformBindingName';
import transformObjectBindingPattern from './transformObjectBindingPattern';

export default function transformBindingElement(node: tt.BindingElement, scope: Scope): string {
  throw scope.createError('Binding Elements are not yet implemented', node);
}