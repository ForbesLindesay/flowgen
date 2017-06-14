import {readFileSync} from 'fs';
import TransformContext from './TransformContext';

export {TransformContext};
export function transformString(filename: string, source: string): string {
  const context = new TransformContext();
  return context.transform(filename, source).code;
}
export function transformFile(filename: string): string {
  return transformString(filename, readFileSync(filename, 'utf8'));
}


// TODO: use micromatch to transform using pattern