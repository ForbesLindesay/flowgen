import * as tt from 'typescript';
import Scope from './Scope';
import transformIdentifier from './transformIdentifier';
import transformArrayBindingPattern from './transformArrayBindingPattern';
import transformObjectBindingPattern from './transformObjectBindingPattern';

export default function transformBindingName(name: tt.BindingName, scope: Scope): string {
  switch (name.kind) {
    case tt.SyntaxKind.Identifier:
      return transformIdentifier(name, scope);
    case tt.SyntaxKind.ObjectBindingPattern:
      return transformObjectBindingPattern(name, scope);
    case tt.SyntaxKind.ArrayBindingPattern:
      return transformArrayBindingPattern(name, scope);
  }
}