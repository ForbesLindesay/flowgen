import * as tt from 'typescript';
import Scope from './Scope';
import transformTypeNode from './transformTypeNode';

export default function transformArrayType(node: tt.ArrayTypeNode, scope: Scope): string {
  return `Array<${transformTypeNode(node.elementType, scope)}>`;
}