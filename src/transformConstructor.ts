import * as tt from 'typescript';
import Scope from './Scope';
import transformTypeNode from './transformTypeNode';
import transformTypeParameterDeclaration from './transformTypeParameterDeclaration';
import transformParameterDeclaration from './transformParameterDeclaration';

export default function transformConstructor(node: tt.ConstructorDeclaration, scope: Scope): string {
  const typeParameters = node.typeParameters ? `<${node.typeParameters.map(arg => transformTypeParameterDeclaration(arg, scope) ).join(',')}>` : ``;
  const parameters = node.parameters.map(p => transformParameterDeclaration(p, scope)).join(',');
  const returnType = node.type ? ': ' + transformTypeNode(node.type, scope) : ': void';
  return `constructor${typeParameters}(${parameters})${returnType};`;
}