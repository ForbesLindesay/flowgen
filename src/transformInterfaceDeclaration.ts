import * as tt from 'typescript';
import Scope from './Scope';
import transformIdentifier from './transformIdentifier';
import transformTypeElement from './transformTypeElement';
import transformTypeParameters from './transformTypeParameters';

export default function transformInterfaceDeclaration(node: tt.InterfaceDeclaration, scope: Scope): string {
  const typeParameters = transformTypeParameters(node.typeParameters, scope);
  scope.addLocalTypeName(node.name.text);
  return `
    interface ${transformIdentifier(node.name, scope)}${typeParameters} {
      ${node.members.map(element => transformTypeElement(element, scope)).join(';')}
    }
  `;
}