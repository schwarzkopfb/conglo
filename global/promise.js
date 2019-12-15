'use strict'

const AsyncIterable = require('../lib/AsyncIterable')

Promise.prototype.toAsyncIterable = function() {
    return new AsyncIterable(this)
}