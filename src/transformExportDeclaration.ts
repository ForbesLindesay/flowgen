import * as tt from 'typescript';
import Scope from './Scope';
import transformIdentifier from './transformIdentifier';

export default function transformExportDeclaration(statement: tt.ExportDeclaration, scope: Scope): string {
  if (!statement.exportClause) return '';
  return statement.exportClause.elements.map(element => {
    const exported = element.name.text;
    const local = (element.propertyName || element.name).text;
    scope.addExport(exported, local);
    const specifierText = exported === local ? `{${local}}` : `{${local} as ${exported}}`;
    if (scope.localTypes.has(local)) {
      return `export type ${specifierText};`;
    }
    if (scope.localEnums.has(local)) {
      const enumSpecifierText = exported === local ? `{${local}Type}` : `{${local}Type as ${exported}Type}`;
      return `export type ${enumSpecifierText};export ${specifierText};`;
    }
    return `export ${specifierText};`;
  }).join('\n');
}