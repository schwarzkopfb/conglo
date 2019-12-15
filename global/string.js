'use strict'

const AsyncIterable = require('../lib/AsyncIterable')

String.prototype.toAsyncIterable = function() {
    return new AsyncIterable(this)
}