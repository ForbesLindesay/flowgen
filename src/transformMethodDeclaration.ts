import * as tt from 'typescript';
import Scope from './Scope';
import transformPropertyName from './transformPropertyName';
import transformTypeNode from './transformTypeNode';
import transformTypeParameterDeclaration from './transformTypeParameterDeclaration';
import transformParameterDeclaration from './transformParameterDeclaration';

export default function transformMethodDeclaration(node: tt.MethodDeclaration, scope: Scope): string {
  const name = transformPropertyName(node.name, scope);
  const typeParameters = node.typeParameters ? `<${node.typeParameters.map(arg => transformTypeParameterDeclaration(arg, scope) ).join(',')}>` : ``;
  const parameters = node.parameters.map(p => transformParameterDeclaration(p, scope)).join(',');
  const returnType = node.type ? ': ' + transformTypeNode(node.type, scope) : ': void';
  return `${name}${typeParameters}(${parameters})${returnType};`;
}