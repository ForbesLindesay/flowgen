import * as tt from 'typescript';
import Scope from './Scope';

export default function transformIdentifier(identifier: tt.Identifier, scope: Scope): string {
  return identifier.text;
}