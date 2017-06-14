import * as tt from 'typescript';
import Scope from './Scope';
import transformExpression from './transformExpression';
import transformTypeLiteral from './transformTypeLiteral';
import transformTypeReference from './transformTypeReference';
import transformUnionType from './transformUnionType';

export default function transformTypeNode(node: tt.TypeNode, scope: Scope): string {
  switch (node.kind) {
    case tt.SyntaxKind.LiteralType:
      return transformExpression((node as tt.LiteralTypeNode).literal, scope);
    case tt.SyntaxKind.TypeLiteral:
      return transformTypeLiteral(node as tt.TypeLiteralNode, scope);
    case tt.SyntaxKind.StringKeyword:
      return 'string';
    case tt.SyntaxKind.NumberKeyword:
      return 'number';
    case tt.SyntaxKind.TypeReference:
      return transformTypeReference(node as tt.TypeReferenceNode, scope);
    case tt.SyntaxKind.UnionType:
      return transformUnionType(node as tt.UnionTypeNode, scope);
    // TODO: support more cases
  }
  throw scope.createError('Unsupported type kind ' + tt.SyntaxKind[node.kind], node);
}