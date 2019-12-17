'use strict'

const AsyncIterable = require('../AsyncIterable')

String.prototype.toAsyncIterable = function() {
    return new AsyncIterable(this)
}