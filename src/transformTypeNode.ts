import * as tt from 'typescript';
import Scope from './Scope';
import transformArrayType from './transformArrayType';
import transformExpression from './transformExpression';
import transformParenthesizedType from './transformParenthesizedType';
import transformTypeLiteral from './transformTypeLiteral';
import transformTypeReference from './transformTypeReference';
import transformUnionType from './transformUnionType';
import transformIntersectionType from './transformIntersectionType';
import transformFunctionType from './transformFunctionType';
import transformTupleType from './transformTupleType';
import transformMappedType from './transformMappedType';
import transformTypeOperator from './transformTypeOperator';
import transformIndexedAccessType from './transformIndexedAccessType';

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
    case tt.SyntaxKind.AnyKeyword:
      return 'any';
    case tt.SyntaxKind.NullKeyword:
      return 'null';
    case tt.SyntaxKind.VoidKeyword:
      return 'void';
    case tt.SyntaxKind.UndefinedKeyword:
      return 'void';
    case tt.SyntaxKind.BooleanKeyword:
      return 'boolean';
    case tt.SyntaxKind.ThisType:
      return 'this';
    case tt.SyntaxKind.TypeReference:
      return transformTypeReference(node as tt.TypeReferenceNode, scope);
    case tt.SyntaxKind.UnionType:
      return transformUnionType(node as tt.UnionTypeNode, scope);
    case tt.SyntaxKind.IntersectionType:
      return transformIntersectionType(node as tt.IntersectionTypeNode, scope);
    case tt.SyntaxKind.ArrayType:
      return transformArrayType(node as tt.ArrayTypeNode, scope);
    case tt.SyntaxKind.FunctionType:
      return transformFunctionType(node as tt.FunctionTypeNode, scope);
    case tt.SyntaxKind.ParenthesizedType:
      return transformParenthesizedType(node as tt.ParenthesizedTypeNode, scope);
    case tt.SyntaxKind.TupleType:
      return transformTupleType(node as tt.TupleTypeNode, scope);
    case tt.SyntaxKind.MappedType:
      return transformMappedType(node as tt.MappedTypeNode, scope);
    case tt.SyntaxKind.TypeOperator:
      return transformTypeOperator(node as tt.TypeOperatorNode, scope);
    case tt.SyntaxKind.IndexedAccessType:
      return transformIndexedAccessType((node as tt.IndexedAccessTypeNode), scope);
    // TODO: support more cases
  }
  throw scope.createError('Unsupported type kind ' + tt.SyntaxKind[node.kind], node);
}