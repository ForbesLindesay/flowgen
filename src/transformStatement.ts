import * as tt from 'typescript';
import Scope from './Scope';
import transformClassDeclaration from './transformClassDeclaration';
import transformExportAssignment from './transformExportAssignment';
import transformExportDeclaration from './transformExportDeclaration';
import transformImportDeclaration from './transformImportDeclaration';
import transformTypeAliasDeclaration from './transformTypeAliasDeclaration';

export default function transformStatement(statement: tt.Statement, scope: Scope): string {
  switch (statement.kind) {
    case tt.SyntaxKind.ClassDeclaration:
      return transformClassDeclaration(statement as tt.ClassDeclaration, scope);
    case tt.SyntaxKind.ExportAssignment:
      return transformExportAssignment(statement as tt.ExportAssignment, scope);
    case tt.SyntaxKind.ExportDeclaration:
      return transformExportDeclaration(statement as tt.ExportDeclaration, scope);
    case tt.SyntaxKind.ImportDeclaration:
      return transformImportDeclaration(statement as tt.ImportDeclaration, scope);
    case tt.SyntaxKind.TypeAliasDeclaration:
      return transformTypeAliasDeclaration(statement as tt.TypeAliasDeclaration, scope);
    // TODO: support more cases
  }
  throw scope.createError('Unsupported statement kind ' + tt.SyntaxKind[statement.kind], statement);
}