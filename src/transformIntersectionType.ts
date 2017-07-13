import * as tt from 'typescript';
import Scope from './Scope';
import transformTypeNode from './transformTypeNode';

export default function transformIntersectionType(type: tt.IntersectionTypeNode, scope: Scope): string {
  return type.types.map(t => transformTypeNode(t, scope)).join(' & ');
}