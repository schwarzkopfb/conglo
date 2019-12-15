'use strict'

const AsyncIterable = require('../lib/AsyncIterable')

Array.prototype.toAsyncIterable = function() {
    return new AsyncIterable(this)
}