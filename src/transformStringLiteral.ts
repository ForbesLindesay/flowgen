import * as tt from 'typescript';
import Scope from './Scope';

export default function transformStringLiteral(expression: tt.StringLiteral, scope: Scope): string {
  return JSON.stringify(expression.text);
}