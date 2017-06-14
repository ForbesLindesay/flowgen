import * as tt from 'typescript';
import Scope from './Scope';
import transformEntityName from './transformEntityName';
import transformTypeNode from './transformTypeNode';

export default function transformTypeReference(node: tt.TypeReferenceNode, scope: Scope): string {
  const args = node.typeArguments ? `<${node.typeArguments.map(arg =>transformTypeNode(arg, scope) ).join(',')}>` : ``;
  return transformEntityName(node.typeName, scope) + args;
}