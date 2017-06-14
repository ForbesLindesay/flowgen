import {transformFile} from '../';

test('index.example.ts', () => {
  expect(transformFile(__dirname + '/index-headers.example.d.ts')).toMatchSnapshot();
})