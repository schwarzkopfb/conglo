'use strict'

const AsyncIterable = require('../AsyncIterable')

Set.prototype.toAsyncIterable = function() {
    return new AsyncIterable(this)
}