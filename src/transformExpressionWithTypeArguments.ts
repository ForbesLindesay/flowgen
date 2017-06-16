import * as tt from 'typescript';
import Scope from './Scope';
import transformExpression from './transformExpression';
import transformTypeNode from './transformTypeNode';

export default function transformExpressionWithTypeArguments(node: tt.ExpressionWithTypeArguments, scope: Scope): string {
  return transformExpression(node.expression, scope) + (node.typeArguments ? `<${node.typeArguments.map(t => transformTypeNode(t, scope))}>` : '');
}