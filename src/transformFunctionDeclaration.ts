import * as tt from 'typescript';
import Scope from './Scope';
import declarationExports from './declarationExports';
import transformIdentifier from './transformPropertyName';
import transformTypeNode from './transformTypeNode';
import transformTypeParameters from './transformTypeParameters';
import transformParameterDeclaration from './transformParameterDeclaration';

export default function transformFunctionDeclaration(node: tt.FunctionDeclaration, scope: Scope): string {
  if (!node.name) {
    throw scope.createError('Expected function declaration to have a name', node);
  }
  const name = transformIdentifier(node.name, scope);
  const typeParameters = transformTypeParameters(node.typeParameters, scope);
  const parameters = node.parameters.map(p => transformParameterDeclaration(p, scope)).join(',');
  const returnType = node.type ? transformTypeNode(node.type, scope) : 'void';
  return `
    declare function ${name}${typeParameters}(${parameters}): ${returnType};
    ${declarationExports(node, scope)}
  `;
}