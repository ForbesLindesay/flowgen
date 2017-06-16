import * as tt from 'typescript';
import Scope from './Scope';
import transformPropertyName from './transformPropertyName';
import transformTypeNode from './transformTypeNode';
import transformTypeParameters from './transformTypeParameters';
import transformParameterDeclaration from './transformParameterDeclaration';

export default function transformMethodSignature(node: tt.MethodSignature, scope: Scope): string {
  const name = transformPropertyName(node.name, scope);
  const typeParameters = transformTypeParameters(node.typeParameters, scope);
  const parameters = node.parameters.map(p => transformParameterDeclaration(p, scope)).join(',');
  const returnType = node.type ? transformTypeNode(node.type, scope) : 'void';
  return `${name}${typeParameters}(${parameters}): ${returnType}`;
}