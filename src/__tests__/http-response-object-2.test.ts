import {transformFile} from '../';

test('index.d.ts', () => {
  expect(transformFile(__dirname + '/http-response-object-2/index.d.ts')).toMatchSnapshot();
});
test('headers.d.ts', () => {
  expect(transformFile(__dirname + '/http-response-object-2/headers.d.ts')).toMatchSnapshot();
});