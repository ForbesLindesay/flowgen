import * as tt from 'typescript';
import Scope from './Scope';
import transformTypeNode from './transformTypeNode';

export default function transformUnionType(type: tt.UnionTypeNode, scope: Scope): string {
  return type.types.map(t => transformTypeNode(t, scope)).join(' | ');
}