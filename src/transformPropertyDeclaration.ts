import * as tt from 'typescript';
import Scope from './Scope';
import hasModifier from './hasModifier';
import transformIdentifier from './transformIdentifier';
import transformPropertyName from './transformPropertyName';
import transformTypeNode from './transformTypeNode';

export default function transformPropertyDeclaration(node: tt.PropertyDeclaration, scope: Scope): string {
  if (node.name.kind === tt.SyntaxKind.ComputedPropertyName) {
    console.warn(scope.createError('Dropping computed property', node.name).message);
    return '';
  }
  const covariant = hasModifier(node, tt.SyntaxKind.ReadonlyKeyword) ? '+' : '';
  const optional = node.questionToken ? '?' : '';
  const key = transformPropertyName(node.name, scope);
  if (!node.type) return '';
  const type = transformTypeNode(node.type, scope);

  return `${covariant}${key}${optional}: ${type};`;
}