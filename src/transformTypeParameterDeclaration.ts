import * as tt from 'typescript';
import Scope from './Scope';
import transformIdentifier from './transformIdentifier';
import transformTypeNode from './transformTypeNode';

export default function transformTypeParameterDeclaration(param: tt.TypeParameterDeclaration, scope: Scope): string {
  const name = transformIdentifier(param.name, scope);
  const constraint = param.constraint ? ': ' + transformTypeNode(param.constraint, scope) : '';
  return `${name}${constraint}`
}