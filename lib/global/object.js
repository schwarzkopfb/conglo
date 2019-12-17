'use strict'

const AsyncIterable = require('../AsyncIterable')

Object.toAsyncIterable = function(obj, fn, self) {
    return AsyncIterable.fromObject(...arguments)
}