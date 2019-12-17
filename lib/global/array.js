'use strict'

const AsyncIterable = require('../AsyncIterable')

Array.prototype.toAsyncIterable = function() {
    return new AsyncIterable(this)
}