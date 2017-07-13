import * as tt from 'typescript';
import Scope from './Scope';
import declarationExports from './declarationExports';
import transformExpression from './transformExpression';
import transformIdentifier from './transformIdentifier';
import transformPropertyName from './transformPropertyName';

export default function transformEnumDeclaration(statement: tt.EnumDeclaration, scope: Scope): string {
  const name = transformIdentifier(statement.name, scope);
  const names = statement.members.map((m) => {
    return `'${transformPropertyName(m.name, scope)}'`;
  });
  const values = statement.members.map((m) => {
    return transformExpression(m.initializer as tt.Expression, scope);
  }).join(' | ');
  
  scope.addEnum(name);

  const typeDeclaration = `type ${name}Type = ${values};`;
  const valueDeclaration = `
    declare var ${name}: {
      ${statement.members.map((m) => {
        return `+${transformPropertyName(m.name, scope)}: ${transformExpression(m.initializer as tt.Expression, scope)};`;
      }).join('')}
      ${statement.members.filter(m => !names.includes(transformExpression(m.initializer as tt.Expression, scope))).map((m) => {
        const initializer = (m.initializer as tt.Expression);
        const value = transformExpression(initializer, scope);
        return `+${initializer.kind !== tt.SyntaxKind.StringLiteral ? `'${value}'` : value}: '${transformPropertyName(m.name, scope)}';`;
      }).join('')}
    };
  `;


  return typeDeclaration + valueDeclaration + declarationExports(statement, scope);
}