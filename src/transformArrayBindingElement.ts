import * as tt from 'typescript';
import Scope from './Scope';
import transformBindingElement from './transformBindingElement';

export default function transformArrayBindingElement(pattern: tt.ArrayBindingElement, scope: Scope): string {
  switch (pattern.kind) {
    case tt.SyntaxKind.OmittedExpression:
      return ',';
    case tt.SyntaxKind.BindingElement:
      return transformBindingElement(pattern, scope);
  }
}