import * as tt from 'typescript';
import Scope from './Scope';

export default function transformNumericLiteral(expression: tt.NumericLiteral, scope: Scope): string {
  return expression.text;
}