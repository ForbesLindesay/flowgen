import * as tt from 'typescript';
import TransformContext from './TransformContext';

export default class Scope {
  readonly source: tt.SourceFile;
  readonly context: TransformContext;
  readonly localTypes: Set<string> = new Set();
  readonly exportedTypes: Set<String> = new Set();
  constructor(source: tt.SourceFile, context: TransformContext) {
    this.source = source;
    this.context = context;
  }
  createError(msg: string, node: tt.TextRange): Error {
    const {line, character} = this.source.getLineAndCharacterOfPosition(node.pos);
    const str = msg + ' ' + this.source.fileName + ':' + line + ',' + character;
    return new Error(str);
  }
  addLocalTypeName(name: string) {
    this.localTypes.add(name);
  }
  addExport(exported: string, local?: string) {
    if (this.localTypes.has(local || exported)) {
      this.exportedTypes.add(exported);
    }
  }
}