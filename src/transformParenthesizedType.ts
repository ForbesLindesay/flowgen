import * as tt from 'typescript';
import Scope from './Scope';
import transformTypeNode from './transformTypeNode';

export default function transformParenthesizedType(node: tt.ParenthesizedTypeNode, scope: Scope): string {
  return `(${transformTypeNode(node.type, scope)})`;
}