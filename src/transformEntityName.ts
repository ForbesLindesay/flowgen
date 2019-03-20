import * as tt from 'typescript';
import Scope from './Scope';
import transformIdentifier from './transformIdentifier';

const aliases: {[key: string]: string} = {
  'NodeJS.ErrnoException': 'ErrnoError',
  'NodeJS.ReadableStream': 'stream$Readable',
  'NodeJS.WritableStream': 'stream$Writable',
  Partial: '$Shape',
  PromiseLike: 'Promise',
};
function resolveAlias(name: string): string {
  if (typeof aliases[name] === 'string') {
    return aliases[name];
  }
  if (/^NodeJS\./.test(name)) {
    throw new Error(
      `Unrecognised NodeJS entity name "${name}". Please submit a pull request to https://github.com/ForbesLindesay/flowgen2 to add the appropriate "alias" to "transformEntityName.ts"`,
    );
  }
  return name;
}
export default function transformEntityName(
  node: tt.EntityName,
  scope: Scope,
): string {
  switch (node.kind) {
    case tt.SyntaxKind.Identifier:
      return resolveAlias(transformIdentifier(node, scope));
    case tt.SyntaxKind.QualifiedName:
      return resolveAlias(
        transformEntityName(node.left, scope) +
          '.' +
          transformEntityName(node.right, scope),
      );
  }
}
