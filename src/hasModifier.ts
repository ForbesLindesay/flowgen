import * as ts from 'typescript';

export type Modifier = (
  ts.SyntaxKind.AbstractKeyword
  | ts.SyntaxKind.DefaultKeyword
  | ts.SyntaxKind.PublicKeyword
  | ts.SyntaxKind.PrivateKeyword
  | ts.SyntaxKind.ProtectedKeyword
  | ts.SyntaxKind.AsyncKeyword
  | ts.SyntaxKind.ConstKeyword
  | ts.SyntaxKind.DeclareKeyword
  | ts.SyntaxKind.ReadonlyKeyword
  | ts.SyntaxKind.StaticKeyword
  | ts.SyntaxKind.ExportKeyword
);
export default function hasModifier(node: ts.Node, modifier: Modifier) {
  return node.modifiers && node.modifiers.some(m => m.kind === modifier);
}