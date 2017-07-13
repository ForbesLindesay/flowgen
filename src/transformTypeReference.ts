import * as tt from 'typescript';
import Scope from './Scope';
import transformEntityName from './transformEntityName';
import transformTypeNode from './transformTypeNode';

export default function transformTypeReference(node: tt.TypeReferenceNode, scope: Scope): string {
  const name = transformEntityName(node.typeName, scope);
  if (name === 'Record' && node.typeArguments && node.typeArguments.length == 2) {
    return `{[key: ${transformTypeNode(node.typeArguments[0], scope)}]: ${transformTypeNode(node.typeArguments[1], scope)}}`;
  }
  if (name === 'Pick' && node.typeArguments && node.typeArguments.length == 2) {
    console.warn(scope.createError('Flow does not have a way to represent "Pick", falling back to any', node.typeArguments[0]).message);
    return `{[key: ${transformTypeNode(node.typeArguments[1], scope)}]: any}`;
  }
  const args = node.typeArguments ? `<${node.typeArguments.map(arg =>transformTypeNode(arg, scope) ).join(',')}>` : ``;
  return name + args;
}