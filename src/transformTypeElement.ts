import * as tt from 'typescript';
import Scope from './Scope';
import hasModifier from './hasModifier';
import transformMethodSignature from './transformMethodSignature';
import transformIndexSignature from './transformIndexSignature';
import transformPropertySignature from './transformPropertySignature';

export default function transformTypeElement(node: tt.TypeElement, scope: Scope): string {
  switch (node.kind) {
    case tt.SyntaxKind.MethodSignature:
      return transformMethodSignature(<tt.MethodSignature>node, scope);
    case tt.SyntaxKind.PropertySignature:
      return transformPropertySignature(<tt.PropertySignature>node, scope);
    case tt.SyntaxKind.IndexSignature:
      return transformIndexSignature(<tt.IndexSignatureDeclaration>node, scope);
  }
  throw scope.createError('Unsupported type element kind ' + tt.SyntaxKind[node.kind], node);
}