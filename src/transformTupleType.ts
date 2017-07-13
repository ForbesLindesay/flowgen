import * as tt from 'typescript';
import Scope from './Scope';
import transformTypeNode from './transformTypeNode';

export default function transformTupleType(node: tt.TupleTypeNode, scope: Scope): string {
  return `[${node.elementTypes.map(n => transformTypeNode(n, scope))}]`;
}