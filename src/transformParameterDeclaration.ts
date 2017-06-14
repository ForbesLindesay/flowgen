import * as tt from 'typescript';
import Scope from './Scope';
import transformBindingName from './transformBindingName';
import transformExpression from './transformExpression';
import transformTypeNode from './transformTypeNode';

export default function transformParameterDeclaration(param: tt.ParameterDeclaration, scope: Scope): string {
  const spread = param.dotDotDotToken ? '...' : '';
  const name = transformBindingName(param.name, scope);
  if (!param.type) {
    return spread + name;
  }
  const optional = param.questionToken ? '?' : '';
  const type = transformTypeNode(param.type, scope);
  const initializer = param.initializer ? ' = ' + transformExpression(param.initializer, scope) : '';
  return `${spread}${name}${optional}: ${type}${initializer}`
}