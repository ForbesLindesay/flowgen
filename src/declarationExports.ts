import * as ts from 'typescript';
import Scope from './Scope';
import hasModifier from './hasModifier';
import transformIdentifier from './transformIdentifier';

export default function declarationExports(node: ts.DeclarationStatement, scope: Scope): string {
  const name = node.name;
  if (!name || name.kind !== ts.SyntaxKind.Identifier) {
    return '';
  }
  if (!hasModifier(node, ts.SyntaxKind.ExportKeyword)) {
    return '';
  }
  const id = name.text;
  let enumStr = '';
  if (scope.localEnums.has(id)) {
    enumStr = `export type {${id}Type};`;
  }
  if (hasModifier(node, ts.SyntaxKind.DefaultKeyword)) {
    scope.addExport('default', id);
    return `${enumStr}export default ${id};`;
  }
  scope.addExport(id, id);
  return `${enumStr}export {${id}};`;
}