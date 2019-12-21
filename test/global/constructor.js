'use strict'

const test = require('tap')

require('../../lib/global/constructor')

test.type(AsyncIterable, 'function', 'constructor should be exposed')
test.type(new AsyncIterable, AsyncIterable, 'iterable instance shoud be instantiated')
