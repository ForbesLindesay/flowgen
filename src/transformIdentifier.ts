import * as tt from 'typescript';
import Scope from './Scope';

export default function transformIdentifier(identifier: tt.Identifier, scope: Scope): string {
  if (scope.localEnums.has(identifier.text)) {
    return identifier.text + 'Type';
  }
  return identifier.text;
}