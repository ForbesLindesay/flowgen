import * as tt from 'typescript';
import Scope from './Scope';
import transformTypeElement from './transformTypeElement';

export default function transformTypeLiteral(node: tt.TypeLiteralNode, scope: Scope): string {
  return `{${node.members.map(member => transformTypeElement(member, scope))}}`;
}