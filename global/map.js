'use strict'

const AsyncIterable = require('../lib/AsyncIterable')

Map.prototype.toAsyncIterable = function(fn, self) {
    return AsyncIterable.fromMap(this, ...arguments)
}