'use strict'

const AsyncIterable = require('../lib/AsyncIterable')

Object.toAsyncIterable = function(obj, fn, self) {
    return AsyncIterable.fromObject(...arguments)
}