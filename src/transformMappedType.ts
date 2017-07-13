import * as tt from 'typescript';
import Scope from './Scope';
import transformTypeParameterDeclaration from './transformTypeParameterDeclaration';
import transformTypeNode from './transformTypeNode';

export default function transformMappedType(node: tt.MappedTypeNode, scope: Scope): string {
  return `{
    ${node.readonlyToken ? '+' : ''}[${transformTypeParameterDeclaration(node.typeParameter, scope)}]: ${node.questionToken ? 'void | ' : ''}${node.type ? transformTypeNode(node.type, scope) : 'any'}
  }`
}