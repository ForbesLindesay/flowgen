import * as tt from 'typescript';
import Scope from './Scope';
import hasModifier from './hasModifier';
import transformIdentifier from './transformIdentifier';
import transformPropertyName from './transformPropertyName';
import transformTypeNode from './transformTypeNode';

function transformParameters(parameter: any, scope: Scope) {
  return `[${transformIdentifier(parameter.name, scope)}: ${transformTypeNode(parameter.type, scope)}]`;
}

export default function transformTypeLiteral(node: tt.TypeElement, scope: Scope): string {
  const covariant = hasModifier(node, tt.SyntaxKind.ReadonlyKeyword) ? '+' : '';
  const optional = node.questionToken ? '?' : '';
  const key = node.name ? transformPropertyName(node.name, scope) : transformParameters((node as any).parameters[0], scope);
  const value = transformTypeNode((node as any).type, scope);

  return `${covariant}${key}${optional}: ${value}`;
}