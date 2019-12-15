'use strict'

const AsyncIterable = require('../../without-globals'),
      test = require('tap'),
      value = async function*() { yield 'ag' }()

require('../../global/asyncGenerator')

test.type(value.toPipeline, 'function', 'prototype should be extended')
test.type(value.toPipeline(), AsyncIterable, 'iterable instance shoud be returned')
test.resolveMatch(value.toPipeline().toArray(), [ 'ag' ], 'iterable should be created from given value')