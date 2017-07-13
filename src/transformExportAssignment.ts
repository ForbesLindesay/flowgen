import * as tt from 'typescript';
import Scope from './Scope';
import transformExpression from './transformExpression';

export default function transformExportAssignment(statement: tt.ExportAssignment, scope: Scope): string {
  if (statement.isExportEquals) {
    return `module.exports = ${transformExpression(statement.expression, scope)};`;
  }
  if (tt.isIdentifier(statement.expression)) {
    const id = statement.expression.text;
    if (scope.localEnums.has(id)) {
      scope.exportedEnums.add('default');
      return `export type {${id}Type as defaultType}; export default ${id};`;
    }
    if (scope.localTypes.has(id)) {
      scope.exportedTypes.add('default');
      return `export type {${id} as defaultType};`;
    }
  }

  return `export default ${transformExpression(statement.expression, scope)};`;
}