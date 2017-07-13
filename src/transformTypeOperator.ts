import * as tt from 'typescript';
import Scope from './Scope';
import transformTypeNode from './transformTypeNode';

export default function transformTypeOperator(node: tt.TypeOperatorNode, scope: Scope): string {
  if (node.operator !== tt.SyntaxKind.KeyOfKeyword) {
    throw scope.createError('Unsupported type operator ' + tt.SyntaxKind[(node.operator as any)], node);
  }
  return `$Keys<${transformTypeNode(node.type, scope)}>`;
}