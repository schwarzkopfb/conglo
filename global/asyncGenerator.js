'use strict'

const AsyncIterable = require('../lib/AsyncIterable'),
      AsyncGenerator = Object.getPrototypeOf(/* istanbul ignore next */async function* () {})

AsyncGenerator.prototype.toAsyncIterable = function() {
    return new AsyncIterable(this)
}

