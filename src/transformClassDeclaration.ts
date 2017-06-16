import * as tt from 'typescript';
import Scope from './Scope';
import declarationExports from './declarationExports';
import transformExpressionWithTypeArguments from './transformExpressionWithTypeArguments';
import transformIdentifier from './transformIdentifier';
import transformClassElement from './transformClassElement';
import transformTypeParameters from './transformTypeParameters';

function transformHeritageClauses(heritageClauses: tt.NodeArray<tt.HeritageClause>, scope: Scope): string {
  // SyntaxKind.ExtendsKeyword
  for (const clause of heritageClauses) {
    if (clause.token === tt.SyntaxKind.ExtendsKeyword) {
      return ' extends ' + clause.types.map(type => transformExpressionWithTypeArguments(type, scope));
    }
  }
  // TODO: implements?
  return '';
}
export default function transformClassDeclaration(node: tt.ClassDeclaration, scope: Scope): string {
  if (!node.name) {
    throw scope.createError('Expected class declaration to have a name', node);
  }
  const typeParameters = transformTypeParameters(node.typeParameters, scope);
  const heritageClauses = node.heritageClauses ? transformHeritageClauses(node.heritageClauses, scope) : '';
  return `
    declare class ${transformIdentifier(node.name, scope)}${typeParameters} ${heritageClauses} {
      ${node.members.map(element => transformClassElement(element, scope)).join('')}
    }
    ${declarationExports(node, scope)}
  `;
}