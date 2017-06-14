import * as tt from 'typescript';
import Scope from './Scope';
import transformIdentifier from './transformIdentifier';
import transformStringLiteral from './transformStringLiteral';
import transformNumericLiteral from './transformNumericLiteral';
import transformExpression from './transformExpression';

export default function transformPropertyName(propertyName: tt.PropertyName, scope: Scope): string {
  switch (propertyName.kind) {
    case tt.SyntaxKind.Identifier:
      return transformIdentifier(propertyName as tt.Identifier, scope);
    case tt.SyntaxKind.StringLiteral:
      return transformStringLiteral(propertyName as tt.StringLiteral, scope);
    case tt.SyntaxKind.NumericLiteral:
      return transformNumericLiteral(propertyName as tt.NumericLiteral, scope);
    case tt.SyntaxKind.ComputedPropertyName:
      return `[${transformExpression(propertyName.expression, scope)}]`;
  }
}