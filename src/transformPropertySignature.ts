import * as tt from 'typescript';
import Scope from './Scope';
import hasModifier from './hasModifier';
import transformPropertyName from './transformPropertyName';
import transformTypeNode from './transformTypeNode';

export default function transformPropertySignature(node: tt.PropertySignature, scope: Scope): string {
  const covariant = hasModifier(node, tt.SyntaxKind.ReadonlyKeyword) ? '+' : '';
  const optional = node.questionToken ? '?' : '';
  const key = transformPropertyName(node.name, scope)
  const value = node.type ? transformTypeNode(node.type, scope) : 'any';

  return `${covariant}${key}${optional}: ${value}`;
}