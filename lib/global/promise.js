'use strict'

const AsyncIterable = require('../AsyncIterable')

Promise.prototype.toAsyncIterable = function() {
    return new AsyncIterable(this)
}