import * as ts from 'typescript';
import Scope from './Scope';
import transformTypeParameterDeclaration from './transformTypeParameterDeclaration';

export default function transformTypeParameters(typeParameters: void | ts.NodeArray<ts.TypeParameterDeclaration>, scope: Scope) {
  return typeParameters ? `<${typeParameters.map(arg => transformTypeParameterDeclaration(arg, scope) ).join(',')}>` : ``;
}