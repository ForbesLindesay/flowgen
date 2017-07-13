import {lsrSync} from 'lsr'
import {TransformContext} from '../';

const context = new TransformContext();

lsrSync(__dirname + '/then-mongo').forEach(entry => {
  if (entry.isFile() && /\.d\.ts/.test(entry.path)) {
    test(entry.path, () => {
      expect(context.transform(entry.fullPath).code).toMatchSnapshot(entry.path);
    });
  }
});