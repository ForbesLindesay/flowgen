import {lsrSync} from 'lsr'
import {TransformContext} from '../';

const context = new TransformContext();

test('http-basic', () => {
  lsrSync(__dirname + '/http-basic').forEach(entry => {
    if (entry.isFile() && /\.d\.ts/.test(entry.path)) {
      expect(context.transform(entry.fullPath).code).toMatchSnapshot(entry.path);
    }
  })
});
