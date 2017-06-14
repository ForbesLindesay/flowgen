import * as tt from 'typescript';
import Scope from './Scope';
import transformIdentifier from './transformIdentifier';

export default function transformEntityName(node: tt.EntityName, scope: Scope): string {
  switch (node.kind) {
    case tt.SyntaxKind.Identifier:
      return transformIdentifier(node, scope);
    case tt.SyntaxKind.QualifiedName:
      return transformEntityName(node.left, scope) + '.' + transformEntityName(node.right, scope);
  }
}