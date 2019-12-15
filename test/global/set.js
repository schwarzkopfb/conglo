'use strict'

const AsyncIterable = require('../../without-globals'),
      test = require('tap'),
      value = new Set([ 's' ])

require('../../global/set')

test.type(value.toPipeline, 'function', 'prototype should be extended')
test.type(value.toPipeline(), AsyncIterable, 'iterable instance shoud be returned')
test.resolveMatch(value.toPipeline().toArray(), [ 's' ], 'iterable should be created from given value')