import {writeFileSync} from 'fs';
import {lsrSync} from 'lsr'
import {TransformContext} from '../';
const mkdirp = require('mkdirp').sync;

const context = new TransformContext();

export default function runTest(name: string) {
  mkdirp(__dirname + '/../../output/' + name);
  lsrSync(__dirname + '/' + name).forEach(entry => {
    if (entry.isDirectory()) {
      mkdirp(__dirname + '/../../output/' + name + entry.path.substr(1));
    }
    if (entry.isFile() && /\.d\.ts/.test(entry.path)) {
      test(entry.path, () => {
        const result = context.transform(entry.fullPath).code;
        writeFileSync(__dirname + '/../../output/' + name + entry.path.substr(1).replace(/\.d\.ts$/, '.js.flow'), result);
        expect(result).toMatchSnapshot(entry.path);
      });
    }
  });
}