import {dirname} from 'path';
import {statSync} from 'fs';
import * as tt from 'typescript';
import {sync as resolve} from 'resolve';
import Scope from './Scope';
import transformIdentifier from './transformIdentifier';
import transformExpression from './transformExpression';

// TODO: share code with transformImportDeclaration

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
    let filename = resolve(name, {basedir: dirname, extensions: ['.d.ts']});
    if (/\.js$/.test(filename)) {
      filename = filename.replace(/\.js$/, '.d.ts');
    }
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
export default function transformImportEqualsDeclaration(statement: tt.ImportEqualsDeclaration, scope: Scope): string {
  const expression = (statement.moduleReference as tt.ExternalModuleReference).expression;
  if (!expression) return '';
  return `const ${transformIdentifier(statement.name, scope)} = require(${transformExpression(expression, scope)});`;
}