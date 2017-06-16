import * as tt from 'typescript';
import Scope from './Scope';
import transformTypeNode from './transformTypeNode';
import transformTypeParameters from './transformTypeParameters';
import transformParameterDeclaration from './transformParameterDeclaration';

export default function transformConstructor(node: tt.ConstructorDeclaration, scope: Scope): string {
  const typeParameters = transformTypeParameters(node.typeParameters, scope);
  const parameters = node.parameters.map(p => transformParameterDeclaration(p, scope)).join(',');
  const returnType = node.type ? ': ' + transformTypeNode(node.type, scope) : ': void';
  return `constructor${typeParameters}(${parameters})${returnType};`;
}