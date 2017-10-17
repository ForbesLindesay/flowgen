import {dirname} from 'path';
import {statSync} from 'fs';
import * as tt from 'typescript';
import {sync as resolve} from 'resolve';
import Scope from './Scope';
import transformIdentifier from './transformIdentifier';
import transformStringLiteral from './transformStringLiteral';

// TODO: share code with transformImportEqualsDeclaration

function packageFilter(pkg: any) {
  if (pkg.types) {
    pkg.main = pkg.types;
  }
  return pkg;
}
function tryResolve(name: string, dirname: string) {
  try {
    let filename = resolve(name, {
      basedir: dirname,
      extensions: ['.d.ts'],
      packageFilter,
    });
    if (/\.js$/.test(filename)) {
      filename = filename.replace(/\.js$/, '.d.ts');
    }
    statSync(filename);
    return filename;
  } catch (ex) {
    if (name[0] !== '.') {
      try {
        const filename = resolve('@types/' + name, {
          basedir: dirname,
          extensions: ['.d.ts'],
        });
        statSync(filename);
        return filename;
      } catch (ex) {}
    }
  }
  return null;
}
export default function transformImportDeclaration(
  statement: tt.ImportDeclaration,
  scope: Scope,
): string {
  if (!statement.importClause) {
    return '';
  }
  const moduleSpecifier = statement.moduleSpecifier as tt.StringLiteral;
  const importedFileName = transformStringLiteral(moduleSpecifier, scope);
  const filename = tryResolve(
    moduleSpecifier.text,
    dirname(scope.source.fileName),
  );
  const importedScope = filename
    ? scope.context.transform(filename).scope
    : new Scope(scope.source, scope.context);

  const result: Array<string> = [];
  const {name, namedBindings} = statement.importClause;
  if (name) {
    const n = transformIdentifier(name, scope);
    if (importedScope.exportedTypes.has('default')) {
      scope.addLocalTypeName(name.text);
      result.push(
        `import type {defaultType as ${n}} from ${importedFileName};`,
      );
    } else {
      if (importedScope.exportedEnums.has('default')) {
        scope.addEnum(name.text);
        result.push(
          `import type {defaultType as ${n}Type} from ${importedFileName};`,
        );
      }
      result.push(`import ${n} from ${importedFileName};`);
    }
  }
  if (namedBindings) {
    switch (namedBindings.kind) {
      case tt.SyntaxKind.NamespaceImport:
        result.push(
          `import * as ${transformIdentifier(
            namedBindings.name,
            scope,
          )} from ${importedFileName};`,
        );
        break;
      case tt.SyntaxKind.NamedImports:
        const specifier = namedBindings as tt.NamedImports;
        specifier.elements.forEach(importSpecifier => {
          const local = importSpecifier.name.text;
          const imported = (importSpecifier.propertyName ||
            importSpecifier.name).text;
          const specifierText = local === imported
            ? `{${local}}`
            : `{${imported} as ${local}}`;
          if (importedScope.exportedTypes.has(imported)) {
            scope.addLocalTypeName(local);
            const specifierText = local === imported
              ? `{${local}}`
              : `{${imported} as ${local}}`;
            result.push(
              `import type ${specifierText} from ${importedFileName};`,
            );
          } else {
            if (importedScope.exportedEnums.has(imported)) {
              scope.addEnum(local);
              if (imported === local) {
                result.push(
                  `import type {${local}Type} from ${importedFileName};`,
                );
              } else {
                result.push(
                  `import type {${imported}Type as ${local}Type} from ${importedFileName};`,
                );
              }
            }
            result.push(`import ${specifierText} from ${importedFileName};`);
          }
        });
        break;
    }
  }
  return result.join('\n');
}
