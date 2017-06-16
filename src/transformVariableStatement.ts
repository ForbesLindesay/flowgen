import * as tt from 'typescript';
import Scope from './Scope';
import declarationExports from './declarationExports';
import transformBindingName from './transformBindingName';
import transformTypeNode from './transformTypeNode';

export default function transformVariableStatement(node: tt.VariableStatement, scope: Scope): string {
  return node.declarationList.declarations.map(node => {
    if (!node.type) {
      return '';
    }
    return `declare var ${transformBindingName(node.name, scope)}: ${transformTypeNode(node.type, scope)}`;
  }).join('\n');
  // if (!node.name) {
  //   throw scope.createError('Expected function declaration to have a name', node);
  // }
  // const name = transformIdentifier(node.name, scope);
  // const typeParameters = transformTypeParameters(node.typeParameters, scope);
  // const parameters = node.parameters.map(p => transformParameterDeclaration(p, scope)).join(',');
  // const returnType = node.type ? transformTypeNode(node.type, scope) : 'void';
  // return `
  //   declare function ${name}${typeParameters}(${parameters}): ${returnType};
  //   ${declarationExports(node, scope)}
  // `;
}