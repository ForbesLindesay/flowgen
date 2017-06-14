import * as tt from 'typescript';
import Scope from './Scope';
import transformIdentifier from './transformIdentifier';
import transformClassElement from './transformClassElement';

export default function transformClassDeclaration(node: tt.ClassDeclaration, scope: Scope): string {
  if (!node.name) {
    throw scope.createError('Expected class declaration to have a name', node);
  }
  return `declare class ${
    transformIdentifier(node.name, scope)} {${node.members.map(element => transformClassElement(element, scope)).join('')
  }}`;
}