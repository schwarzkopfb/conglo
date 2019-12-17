'use strict'

const AsyncIterable = require('../AsyncIterable'),
      AsyncGenerator = Object.getPrototypeOf(/* istanbul ignore next */async function* () {})

AsyncGenerator.prototype.toAsyncIterable = function() {
    return new AsyncIterable(this)
}

