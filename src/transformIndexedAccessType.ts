import * as tt from 'typescript';
import Scope from './Scope';
import transformTypeNode from './transformTypeNode';

export default function transformIndexedAccessType(node: tt.IndexedAccessTypeNode, scope: Scope): string {
  if (node.indexType.kind !== tt.SyntaxKind.LiteralType) {
    console.warn(scope.createError('Reverting to any because flow does not support non-string literal IndexedAccessTypes', node.indexType).message);
    return 'any';
  }
  return `$PropertyType<${transformTypeNode(node.objectType, scope)}, ${transformTypeNode(node.indexType, scope)}>`;
}