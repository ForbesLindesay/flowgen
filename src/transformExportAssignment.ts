import * as tt from 'typescript';
import Scope from './Scope';
import transformExpression from './transformExpression';

export default function transformExportAssignment(statement: tt.ExportAssignment, scope: Scope): string {
  if (statement.isExportEquals) {
    return `module.exports = ${transformExpression(statement.expression, scope)};`;
  }
  return `export default ${transformExpression(statement.expression, scope)};`;
}