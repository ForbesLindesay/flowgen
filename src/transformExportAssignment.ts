import * as tt from 'typescript';
import Scope from './Scope';
import transformExpression from './transformExpression';

export default function transformExportAssignment(statement: tt.ExportAssignment, scope: Scope): string {
  return `export default ${transformExpression(statement.expression, scope)};`;
}