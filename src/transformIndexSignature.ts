import * as tt from 'typescript';
import Scope from './Scope';
import hasModifier from './hasModifier';
import transformIdentifier from './transformIdentifier';
import transformTypeNode from './transformTypeNode';

function transformParameters(parameter: any, scope: Scope) {
  return `[${transformIdentifier(parameter.name, scope)}: ${transformTypeNode(parameter.type, scope)}]`;
}

export default function transformIndexSignature(node: tt.IndexSignatureDeclaration, scope: Scope): string {
  const covariant = hasModifier(node, tt.SyntaxKind.ReadonlyKeyword) ? '+' : '';
  const optional = node.questionToken ? '?' : '';
  const key = transformParameters(node.parameters[0], scope);
  const value = node.type ? transformTypeNode(node.type, scope) : 'any';

  return `${covariant}${key}${optional}: ${value}`;
}