'use strict'

const AsyncIterable = require('../AsyncIterable')

Map.prototype.toAsyncIterable = function(fn, self) {
    return AsyncIterable.fromMap(this, ...arguments)
}