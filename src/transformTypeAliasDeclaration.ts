import * as ts from 'typescript';
import Scope from './Scope';
import hasModifier from './hasModifier';
import transformIdentifier from './transformIdentifier';
import transformTypeNode from './transformTypeNode';

export default function transformTypeAliasDeclaration(statement: ts.TypeAliasDeclaration, scope: Scope): string {
  const hasExport = hasModifier(statement, ts.SyntaxKind.ExportKeyword);
  scope.addLocalTypeName(statement.name.text);
  if (hasExport) {
    scope.addExport(statement.name.text);
  }
  const modifiers = hasExport ? 'export ' : '';
  return `${modifiers}type ${transformIdentifier(statement.name, scope)} = ${transformTypeNode(statement.type, scope)}`;
}