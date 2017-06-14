import {dirname} from 'path';
import * as tt from 'typescript';
import {sync as resolve} from 'resolve';
import Scope from './Scope';
import transformIdentifier from './transformIdentifier';
import transformStringLiteral from './transformStringLiteral';

export default function transformImportDeclaration(statement: tt.ImportDeclaration, scope: Scope): string {
  if (!statement.importClause) {
    return '';
  }
  const moduleSpecifier = statement.moduleSpecifier as tt.StringLiteral;
  const importedFileName = transformStringLiteral(moduleSpecifier, scope);
  const importedScope = scope.context.transform(resolve(moduleSpecifier.text + '.d.ts', {basedir: dirname(scope.source.fileName)})).scope;

  const result: Array<string> = [];
  const {name, namedBindings} = statement.importClause;
  if (name) {
    if (importedScope.exportedTypes.has('default')) {
      scope.addLocalTypeName(name.text);
      result.push(`import type ${transformIdentifier(name, scope)} from ${importedFileName};`);
    } else {
      result.push(`import ${transformIdentifier(name, scope)} from ${importedFileName};`);
    }
  }
  if (namedBindings) {
    switch (namedBindings.kind) {
      case tt.SyntaxKind.NamespaceImport:
        result.push(`import * as ${transformIdentifier(namedBindings.name, scope)} from ${importedFileName};`);
        break;
      case tt.SyntaxKind.NamedImports:
        const specifier = (namedBindings as tt.NamedImports);
        specifier.elements.forEach(importSpecifier => {
          const local = importSpecifier.name.text;
          const imported = (importSpecifier.propertyName || importSpecifier.name).text;
          const specifierText = local === imported ? `{${local}}` : `{${imported} as ${local}}`;
          if (importedScope.exportedTypes.has(imported)) {
            scope.addLocalTypeName(local);
            result.push(`import type ${specifierText} from ${importedFileName};`);
          } else {
            result.push(`import ${specifierText} from ${importedFileName};`);
          }
        });
        break;
    }
  }
  return result.join('\n');
}