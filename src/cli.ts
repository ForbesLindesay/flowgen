#! /usr/bin/env node
import {writeFileSync} from 'fs';
import {lsrSync} from 'lsr';
import {isMatch} from 'micromatch';
import {TransformContext} from './';

const context = new TransformContext();

const patterns = process.argv.slice(2);
lsrSync(process.cwd()).forEach(entry => {
  if (entry.isFile() && /\.d.ts$/.test(entry.path) && patterns.some(p => isMatch(entry.path.substr(2), p))) {
    const code = context.transform(entry.fullPath).code;
    writeFileSync(entry.fullPath.replace(/\.d\.ts$/, '.js.flow'), code);
  }
});
