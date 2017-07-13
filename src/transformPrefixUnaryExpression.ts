import * as tt from 'typescript';
import Scope from './Scope';
import transformExpression from './transformExpression';

function getOperator(op: tt.PrefixUnaryOperator): string {
  switch (op) {
    case tt.SyntaxKind.PlusPlusToken:
      return '++';
    case tt.SyntaxKind.MinusMinusToken:
      return '--';
    case tt.SyntaxKind.PlusToken:
      return '+';
    case tt.SyntaxKind.MinusToken:
      return '-';
    case tt.SyntaxKind.TildeToken:
      return '~';
    case tt.SyntaxKind.ExclamationToken:
      return '!';
  }
}
export default function transformPropertyDeclaration(node: tt.PrefixUnaryExpression, scope: Scope): string {
  return getOperator(node.operator) + transformExpression(node.operand, scope);
}