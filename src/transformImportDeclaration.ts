import {dirname} from 'path';
import {statSync} from 'fs';
import * as tt from 'typescript';
import {sync as resolve} from 'resolve';
import Scope from './Scope';
import transformIdentifier from './transformIdentifier';
import transformStringLiteral from './transformStringLiteral';

function packageFilter(pkg: any) {
  if (pkg.main) {
    delete pkg.main;
  }
  if (pkg.types) {
    pkg.main = pkg.types;
  }
}
function tryResolve(name: string, dirname: string) {
  try {
    const filename = resolve(name, {basedir: dirname, extensions: ['.d.ts']});
    statSync(filename);
    return filename;
  } catch (ex) {
    if (name[0] !== '.') {
      try {
        const filename = resolve('@types/' + name, {basedir: dirname, extensions: ['.d.ts']});
        statSync(filename);
        return filename;
      } catch (ex) {}
    }
  }
  return null;
}
export default function transformImportDeclaration(statement: tt.ImportDeclaration, scope: Scope): string {
  if (!statement.importClause) {
    return '';
  }
  const moduleSpecifier = statement.moduleSpecifier as tt.StringLiteral;
  const importedFileName = transformStringLiteral(moduleSpecifier, scope);
  const filename = tryResolve(moduleSpecifier.text, dirname(scope.source.fileName));
  const importedScope = filename ? scope.context.transform(filename).scope : new Scope(scope.source, scope.context);

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