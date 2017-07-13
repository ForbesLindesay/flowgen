// @flow

import connect from './output/then-mongo';

const db = connect('connection string', ['foo', 'bar']);
db.collection('foo').find();