import {transformFile} from '../';

test('index.d.ts', () => {
  expect(transformFile(__dirname + '/http-response-object/index.d.ts')).toMatchSnapshot();
});
test('headers.d.ts', () => {
  expect(transformFile(__dirname + '/http-response-object/headers.d.ts')).toMatchSnapshot();
});