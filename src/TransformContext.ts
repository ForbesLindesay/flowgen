import {readFileSync} from 'fs';
import {resolve} from 'path';
import * as tt from 'typescript';
import {format} from 'prettier';
import Scope from './Scope';
import transformStatement from './transformStatement';

export default class TransformContext {
  _cache: Map<string, {code: string, scope: Scope}> = new Map();

  transform(filename: string, src?: string): {code: string, scope: Scope} {
    const trueFilename = resolve(filename);
    const cachedResult = this._cache.get(trueFilename);
    if (cachedResult) {
      return cachedResult;
    }
    if (src == null) {
      src = readFileSync(trueFilename, 'utf8');
    }
    const sourceFile = tt.createSourceFile(trueFilename, src, tt.ScriptTarget.ES2017, false);
    const scope = new Scope(sourceFile, this);
    const result = {code: '', scope};
    this._cache.set(trueFilename, result);
    result.code = format(
      '// @flow\n// Generated using flowgen2\n\n' + sourceFile.statements.map(statement => transformStatement(statement, scope)).join('\n'),
      {
        bracketSpacing: false,
        filepath: trueFilename.replace(/.ts$/, '.js'),
        parser: 'flow',
        singleQuote: true,
        trailingComma: 'all',
      },
    );
    return result;
  }
}