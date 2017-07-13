import * as ts from 'typescript';
import Scope from './Scope';
import hasModifier from './hasModifier';
import transformIdentifier from './transformIdentifier';
import transformTypeNode from './transformTypeNode';
import declarationExports from './declarationExports';
import transformTypeParameters from './transformTypeParameters';

export default function transformTypeAliasDeclaration(statement: ts.TypeAliasDeclaration, scope: Scope): string {
  scope.addLocalTypeName(statement.name.text);
  return `
    type ${transformIdentifier(statement.name, scope)}${transformTypeParameters(statement.typeParameters, scope)} = ${transformTypeNode(statement.type, scope)}
    ${declarationExports(statement, scope)}
  `;
}