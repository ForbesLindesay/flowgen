import * as tt from 'typescript';
import Scope from './Scope';
import transformClassDeclaration from './transformClassDeclaration';
import transformEnumDeclaration from './transformEnumDeclaration';
import transformExportAssignment from './transformExportAssignment';
import transformExportDeclaration from './transformExportDeclaration';
import transformFunctionDeclaration from './transformFunctionDeclaration';
import transformImportDeclaration from './transformImportDeclaration';
import transformImportEqualsDeclaration from './transformImportEqualsDeclaration';
import transformInterfaceDeclaration from './transformInterfaceDeclaration';
import transformTypeAliasDeclaration from './transformTypeAliasDeclaration';
import transformVariableStatement from './transformVariableStatement';

export default function transformStatement(statement: tt.Statement, scope: Scope): string {
  switch (statement.kind) {
    case tt.SyntaxKind.ClassDeclaration:
      return transformClassDeclaration(statement as tt.ClassDeclaration, scope);
    case tt.SyntaxKind.EnumDeclaration:
      return transformEnumDeclaration(statement as tt.EnumDeclaration, scope);
    case tt.SyntaxKind.ExportAssignment:
      return transformExportAssignment(statement as tt.ExportAssignment, scope);
    case tt.SyntaxKind.ExportDeclaration:
      return transformExportDeclaration(statement as tt.ExportDeclaration, scope);
    case tt.SyntaxKind.FunctionDeclaration:
      return transformFunctionDeclaration(statement as tt.FunctionDeclaration, scope);
    case tt.SyntaxKind.ImportDeclaration:
      return transformImportDeclaration(statement as tt.ImportDeclaration, scope);
    case tt.SyntaxKind.ImportEqualsDeclaration:
      return transformImportEqualsDeclaration(<tt.ImportEqualsDeclaration>statement, scope);
    case tt.SyntaxKind.TypeAliasDeclaration:
      return transformTypeAliasDeclaration(statement as tt.TypeAliasDeclaration, scope);
    case tt.SyntaxKind.InterfaceDeclaration:
      return transformInterfaceDeclaration(statement as tt.InterfaceDeclaration, scope);
    case tt.SyntaxKind.VariableStatement:
      return transformVariableStatement(statement as tt.VariableStatement, scope);
    
    // TODO: support more cases
  }
  throw scope.createError('Unsupported statement kind ' + tt.SyntaxKind[statement.kind], statement);
}