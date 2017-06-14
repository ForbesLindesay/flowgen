import {transformFile} from '../';

test('index.example.ts', () => {
  expect(transformFile(__dirname + '/index.example.d.ts')).toMatchSnapshot();
})