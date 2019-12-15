'use strict'

const AsyncIterable = require('../lib/AsyncIterable')

Set.prototype.toAsyncIterable = function() {
    return new AsyncIterable(this)
}