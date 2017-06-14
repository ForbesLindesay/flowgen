import * as tt from 'typescript';
import Scope from './Scope';
import transformExpression from './transformExpression';

export default function transformTypeAliasDeclaration(node: tt.TypeNode, scope: Scope): string {
  switch (node.kind) {
    case tt.SyntaxKind.LiteralType:
      return transformExpression((node as any).literal, scope);
    // TODO: support more cases
  }
  throw scope.createError('Unsupported statement kind ' + tt.SyntaxKind[node.kind], node);
  // TODO: actually return something
}