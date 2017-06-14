import * as tt from 'typescript';
import Scope from './Scope';
import transformConstructor from './transformConstructor';
import transformIdentifier from './transformIdentifier';
import transformPropertyDeclaration from './transformPropertyDeclaration';
import transformMethodDeclaration from './transformMethodDeclaration';

export default function transformClassElement(node: tt.ClassElement, scope: Scope): string {
  switch (node.kind) {
    case tt.SyntaxKind.SemicolonClassElement:
      return '';
    case tt.SyntaxKind.PropertyDeclaration:
      return transformPropertyDeclaration(node as tt.PropertyDeclaration, scope);
    case tt.SyntaxKind.Constructor:
      return transformConstructor(node as tt.ConstructorDeclaration, scope);
    case tt.SyntaxKind.MethodDeclaration:
      return transformMethodDeclaration(node as tt.MethodDeclaration, scope);
  }
  throw scope.createError('Unsupported class element kind ' + tt.SyntaxKind[node.kind], node);
}